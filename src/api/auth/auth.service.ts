import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from 'src/services/mongoose/schemas/user.schema';
import { Role } from 'src/services/mongoose/schemas/role.schema';
import { RoleSlugEnum } from 'src/utils/enums/role-slug.enum';
import { DriverRegisterDto, LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
    private jwtService: JwtService,
  ) {}

  private buildAuthResponse(user: UserDocument) {
    const role = user.role as any;
    const payload = {
      sub: user._id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      roleId: role?._id ?? role ?? null,
    };

    return {
      access_token: this.jwtService.sign(payload),
      userId: user._id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePic: user.profilePic,
      role: role ?? null,
    };
  }

  async registerDriver(dto: DriverRegisterDto) {
    const driverRole = await this.roleModel.findOne({
      slug: RoleSlugEnum.DRIVER,
      isActive: { $ne: false },
    });
    if (!driverRole) {
      throw new BadRequestException('Driver role not configured');
    }

    const existingEmail = await this.userModel.findOne({
      email: dto.email,
      deletedAt: null,
    });
    if (existingEmail) {
      throw new ConflictException('Email already registered');
    }

    const existingPhone = await this.userModel.findOne({
      phoneNumber: dto.phoneNumber,
      deletedAt: null,
    });
    if (existingPhone) {
      throw new ConflictException('Phone number already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = new this.userModel({
      email: dto.email,
      phoneNumber: dto.phoneNumber,
      firstName: dto.firstName,
      lastName: dto.lastName,
      dateOfBirth: new Date(dto.dateOfBirth),
      address: dto.address,
      state: dto.state,
      city: dto.city,
      profilePic: dto.profilePic,
      password: hashedPassword,
      role: driverRole._id,
      isActive: true,
    });

    await user.save();
    const populated = await this.getPopulatedUser(user._id);
    return this.buildAuthResponse(populated!);
  }

  async driverLogin(loginDto: LoginDto) {
    const user = await this.userModel
      .findOne({ email: loginDto.email, deletedAt: null })
      .select('+password')
      .populate('role')
      .exec();

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const role = user.role as any;
    if (!role || role.slug !== RoleSlugEnum.DRIVER) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.validateLoginAndRespond(user, loginDto.password);
  }

  async adminLogin(loginDto: LoginDto) {
    const user = await this.userModel
      .findOne({ email: loginDto.email, deletedAt: null })
      .select('+password')
      .populate('role')
      .exec();

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const role = user.role as any;
    if (!role || role.slug !== RoleSlugEnum.ADMIN) {
      throw new UnauthorizedException('Access denied. Admin privileges required.');
    }

    return this.validateLoginAndRespond(user, loginDto.password);
  }

  private async validateLoginAndRespond(user: UserDocument, password: string) {
    if (!user.isActive) {
      throw new UnauthorizedException('Your account is inactive. Please contact support.');
    }

    const role = user.role as any;
    if (role && role.isActive === false) {
      throw new UnauthorizedException('Your role is inactive. Please contact support.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.buildAuthResponse(user);
  }

  async getPopulatedUser(userId: string): Promise<UserDocument | null> {
    return this.userModel
      .findOne({ _id: userId, deletedAt: null })
      .populate({
        path: 'role',
        populate: { path: 'permissions' },
      })
      .exec();
  }
}
