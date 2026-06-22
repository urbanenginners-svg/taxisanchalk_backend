import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from 'src/services/mongoose/schemas/user.schema';
import { Role } from 'src/services/mongoose/schemas/role.schema';
import { CreateUserDto, GetUsersQueryDto, UpdateUserDto } from './dto';
import { getPaginatedDataWithAggregation } from 'src/utils/services/get-paginated-data-aggregation.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
  ) {}

  private async validateRole(roleId: string): Promise<void> {
    if (!roleId) {
      throw new BadRequestException('A role ID must be provided');
    }

    const foundRole = await this.roleModel
      .findOne({ _id: roleId, isActive: { $ne: false } })
      .exec();

    if (!foundRole) {
      throw new BadRequestException(`Role with ID '${roleId}' does not exist`);
    }
  }

  async create(createUserDto: CreateUserDto, requestUserId?: string): Promise<UserDocument> {
    const { password, role, email, phoneNumber, ...rest } = createUserDto;

    await this.validateRole(role);

    const existingEmail = await this.userModel.findOne({ email, deletedAt: null }).exec();
    if (existingEmail) {
      throw new ConflictException(`A user with email '${email}' already exists`);
    }

    if (phoneNumber) {
      const existingPhone = await this.userModel
        .findOne({ phoneNumber, deletedAt: null })
        .exec();
      if (existingPhone) {
        throw new ConflictException(
          `A user with phone number '${phoneNumber}' already exists`,
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({
      ...rest,
      email,
      ...(phoneNumber && { phoneNumber }),
      password: hashedPassword,
      role,
      isActive: true,
      ...(requestUserId && { createdBy: requestUserId }),
    });

    return user.save();
  }

  async findAll(query: GetUsersQueryDto): Promise<{ data: any[]; meta: any }> {
    const { roleId, roleName, isActive } = query;

    const matchStage: Record<string, any> = { deletedAt: null };

    if (isActive !== undefined) {
      matchStage.isActive = isActive;
    }

    const pipeline: any[] = [
      { $match: matchStage },
      {
        $lookup: {
          from: 'roles',
          localField: 'role',
          foreignField: '_id',
          as: 'roleData',
        },
      },
      { $unwind: { path: '$roleData', preserveNullAndEmptyArrays: true } },
    ];

    if (roleId) {
      pipeline.push({ $match: { role: roleId } });
    }

    if (roleName) {
      pipeline.push({ $match: { 'roleData.name': roleName } });
    }

    pipeline.push({
      $project: {
        password: 0,
        otp: 0,
      },
    });

    const [data, meta] = await getPaginatedDataWithAggregation(
      this.userModel,
      query,
      pipeline,
    );
    return { data, meta };
  }

  async findOne(id: string): Promise<UserDocument> {
    const user = await this.userModel
      .findOne({ _id: id, deletedAt: null })
      .populate('role')
      .exec();

    if (!user) {
      throw new NotFoundException(`User with ID '${id}' not found`);
    }

    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    requestUserId?: string,
  ): Promise<UserDocument> {
    const user = await this.findOne(id);
    const { password, role, email, phoneNumber, ...rest } = updateUserDto;

    if (role) {
      await this.validateRole(role);
    }

    if (email && email !== user.email) {
      const existingEmail = await this.userModel
        .findOne({ email, deletedAt: null, _id: { $ne: id } })
        .exec();
      if (existingEmail) {
        throw new ConflictException(`A user with email '${email}' already exists`);
      }
    }

    if (phoneNumber && phoneNumber !== user.phoneNumber) {
      const existingPhone = await this.userModel
        .findOne({ phoneNumber, deletedAt: null, _id: { $ne: id } })
        .exec();
      if (existingPhone) {
        throw new ConflictException(
          `A user with phone number '${phoneNumber}' already exists`,
        );
      }
    }

    Object.assign(user, rest);
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (role) user.role = role;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    if (requestUserId) user.lastUpdatedBy = requestUserId;

    return user.save();
  }

  async remove(id: string, requestUserId?: string): Promise<{ deleted: boolean }> {
    const user = await this.findOne(id);
    user.deletedAt = new Date();
    if (requestUserId) user.deletedBy = requestUserId;
    user.isActive = false;
    await user.save();
    return { deleted: true };
  }
}
