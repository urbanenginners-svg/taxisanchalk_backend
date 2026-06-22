import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  TeamDriver,
  TeamDriverDocument,
} from 'src/services/mongoose/schemas/team-driver.schema';
import { CreateTeamDriverDto, UpdateTeamDriverDto } from './dto';
import { CommonFieldsDto } from 'src/utils/dtos/common-fields.dto';
import { getPaginatedDataWithAggregation } from 'src/utils/services/get-paginated-data-aggregation.service';

@Injectable()
export class TeamDriverService {
  constructor(
    @InjectModel(TeamDriver.name) private teamDriverModel: Model<TeamDriver>,
  ) {}

  async create(
    dto: CreateTeamDriverDto,
    parentDriverId: string,
  ): Promise<TeamDriverDocument> {
    const driver = new this.teamDriverModel({
      ...dto,
      parentDriverId,
      createdBy: parentDriverId,
      isActive: true,
    });
    return driver.save();
  }

  async findAll(
    parentDriverId: string,
    query: CommonFieldsDto,
  ): Promise<{ data: any[]; meta: any }> {
    const pipeline = [
      { $match: { parentDriverId, deletedAt: null } },
    ];
    const [data, meta] = await getPaginatedDataWithAggregation(
      this.teamDriverModel,
      query,
      pipeline,
    );
    return { data, meta };
  }

  async findOne(id: string, parentDriverId: string): Promise<TeamDriverDocument> {
    const driver = await this.teamDriverModel
      .findOne({ _id: id, parentDriverId, deletedAt: null })
      .exec();
    if (!driver) {
      throw new NotFoundException('Team driver not found');
    }
    return driver;
  }

  async update(
    id: string,
    dto: UpdateTeamDriverDto,
    parentDriverId: string,
  ): Promise<TeamDriverDocument> {
    const driver = await this.findOne(id, parentDriverId);
    Object.assign(driver, dto);
    return driver.save();
  }

  async remove(id: string, parentDriverId: string): Promise<{ deleted: boolean }> {
    const driver = await this.findOne(id, parentDriverId);
    driver.deletedAt = new Date();
    driver.isActive = false;
    await driver.save();
    return { deleted: true };
  }

  async assertBelongsToParent(teamDriverId: string, parentDriverId: string) {
    const driver = await this.teamDriverModel
      .findOne({ _id: teamDriverId, parentDriverId, deletedAt: null, isActive: true })
      .exec();
    if (!driver) {
      throw new BadRequestException('Invalid team driver for this account');
    }
    return driver;
  }
}
