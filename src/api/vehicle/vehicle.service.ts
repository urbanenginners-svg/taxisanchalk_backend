import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Vehicle, VehicleDocument } from 'src/services/mongoose/schemas/vehicle.schema';
import { AssignTeamDriverDto, CreateVehicleDto, UpdateVehicleDto } from './dto';
import { TeamDriverService } from 'src/api/team-driver/team-driver.service';
import { CommonFieldsDto } from 'src/utils/dtos/common-fields.dto';
import { getPaginatedDataWithAggregation } from 'src/utils/services/get-paginated-data-aggregation.service';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<Vehicle>,
    private teamDriverService: TeamDriverService,
  ) {}

  async create(dto: CreateVehicleDto, driverId: string): Promise<VehicleDocument> {
    const existing = await this.vehicleModel
      .findOne({ vehicleNumber: dto.vehicleNumber, deletedAt: null })
      .exec();
    if (existing) {
      throw new ConflictException('Vehicle number already registered');
    }

    if (dto.assignedTeamDriverId) {
      await this.teamDriverService.assertBelongsToParent(
        dto.assignedTeamDriverId,
        driverId,
      );
    }

    const vehicle = new this.vehicleModel({
      ...dto,
      registeredBy: driverId,
      createdBy: driverId,
      isActive: true,
    });
    return vehicle.save();
  }

  async findAll(
    driverId: string,
    query: CommonFieldsDto,
  ): Promise<{ data: any[]; meta: any }> {
    const pipeline = [
      { $match: { registeredBy: driverId, deletedAt: null } },
      {
        $lookup: {
          from: 'team_drivers',
          localField: 'assignedTeamDriverId',
          foreignField: '_id',
          as: 'assignedDriver',
        },
      },
      {
        $unwind: { path: '$assignedDriver', preserveNullAndEmptyArrays: true },
      },
    ];
    const [data, meta] = await getPaginatedDataWithAggregation(
      this.vehicleModel,
      query,
      pipeline,
    );
    return { data, meta };
  }

  async findOne(id: string, driverId: string): Promise<VehicleDocument> {
    const vehicle = await this.vehicleModel
      .findOne({ _id: id, registeredBy: driverId, deletedAt: null })
      .populate('assignedTeamDriverId')
      .exec();
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }
    return vehicle;
  }

  async update(
    id: string,
    dto: UpdateVehicleDto,
    driverId: string,
  ): Promise<VehicleDocument> {
    const vehicle = await this.findOne(id, driverId);

    if (dto.assignedTeamDriverId) {
      await this.teamDriverService.assertBelongsToParent(
        dto.assignedTeamDriverId,
        driverId,
      );
    }

    Object.assign(vehicle, dto);
    return vehicle.save();
  }

  async assignDriver(
    id: string,
    dto: AssignTeamDriverDto,
    driverId: string,
  ): Promise<VehicleDocument> {
    const vehicle = await this.findOne(id, driverId);
    await this.teamDriverService.assertBelongsToParent(
      dto.assignedTeamDriverId,
      driverId,
    );
    vehicle.assignedTeamDriverId = dto.assignedTeamDriverId;
    return vehicle.save();
  }

  async remove(id: string, driverId: string): Promise<{ deleted: boolean }> {
    const vehicle = await this.findOne(id, driverId);
    vehicle.deletedAt = new Date();
    vehicle.isActive = false;
    await vehicle.save();
    return { deleted: true };
  }
}
