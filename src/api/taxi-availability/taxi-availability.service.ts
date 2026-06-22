import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  TaxiAvailability,
  TaxiAvailabilityDocument,
} from 'src/services/mongoose/schemas/taxi-availability.schema';
import {
  TaxiEnquiry,
  TaxiEnquiryDocument,
} from 'src/services/mongoose/schemas/taxi-enquiry.schema';
import {
  CreateTaxiAvailabilityDto,
  CreateTaxiEnquiryDto,
  RespondTaxiEnquiryDto,
} from './dto';
import { TaxiAvailabilityStatus } from 'src/utils/enums/taxi-availability-status.enum';
import { TaxiEnquiryStatus } from 'src/utils/enums/taxi-enquiry-status.enum';
import { CommonFieldsDto } from 'src/utils/dtos/common-fields.dto';
import { getPaginatedDataWithAggregation } from 'src/utils/services/get-paginated-data-aggregation.service';

@Injectable()
export class TaxiAvailabilityService {
  constructor(
    @InjectModel(TaxiAvailability.name)
    private availabilityModel: Model<TaxiAvailability>,
    @InjectModel(TaxiEnquiry.name)
    private enquiryModel: Model<TaxiEnquiry>,
  ) {}

  async create(
    dto: CreateTaxiAvailabilityDto,
    driverId: string,
  ): Promise<TaxiAvailabilityDocument> {
    const availability = new this.availabilityModel({
      ...dto,
      availableFrom: new Date(dto.availableFrom),
      availableUntil: dto.availableUntil ? new Date(dto.availableUntil) : undefined,
      driverId,
      createdBy: driverId,
      status: TaxiAvailabilityStatus.ACTIVE,
    });
    return availability.save();
  }

  async findAllActive(
    driverId: string,
    query: CommonFieldsDto,
  ): Promise<{ data: any[]; meta: any }> {
    const pipeline = [
      {
        $match: {
          status: TaxiAvailabilityStatus.ACTIVE,
          driverId: { $ne: driverId },
          deletedAt: null,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'driverId',
          foreignField: '_id',
          as: 'driver',
        },
      },
      { $unwind: { path: '$driver', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'vehicles',
          localField: 'vehicleId',
          foreignField: '_id',
          as: 'vehicle',
        },
      },
      { $unwind: { path: '$vehicle', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          'driver.password': 0,
          'driver.otp': 0,
        },
      },
    ];
    const [data, meta] = await getPaginatedDataWithAggregation(
      this.availabilityModel,
      query,
      pipeline,
    );
    return { data, meta };
  }

  async findMyAvailabilities(
    driverId: string,
    query: CommonFieldsDto,
  ): Promise<{ data: any[]; meta: any }> {
    const pipeline = [{ $match: { driverId, deletedAt: null } }];
    const [data, meta] = await getPaginatedDataWithAggregation(
      this.availabilityModel,
      query,
      pipeline,
    );
    return { data, meta };
  }

  async deactivate(id: string, driverId: string): Promise<TaxiAvailabilityDocument> {
    const availability = await this.availabilityModel
      .findOne({ _id: id, driverId, deletedAt: null })
      .exec();
    if (!availability) {
      throw new NotFoundException('Availability not found');
    }
    availability.status = TaxiAvailabilityStatus.INACTIVE;
    return availability.save();
  }

  async createEnquiry(
    availabilityId: string,
    dto: CreateTaxiEnquiryDto,
    enquirerId: string,
  ): Promise<TaxiEnquiryDocument> {
    const availability = await this.availabilityModel
      .findOne({ _id: availabilityId, deletedAt: null, status: TaxiAvailabilityStatus.ACTIVE })
      .exec();

    if (!availability) {
      throw new NotFoundException('Availability not found');
    }

    if (availability.driverId === enquirerId) {
      throw new BadRequestException('You cannot enquire on your own availability');
    }

    const enquiry = new this.enquiryModel({
      availabilityId,
      enquiredBy: enquirerId,
      message: dto.message,
      status: TaxiEnquiryStatus.PENDING,
      createdBy: enquirerId,
    });
    return enquiry.save();
  }

  async getEnquiriesForAvailability(
    availabilityId: string,
    ownerId: string,
    query: CommonFieldsDto,
  ): Promise<{ data: any[]; meta: any }> {
    const availability = await this.availabilityModel
      .findOne({ _id: availabilityId, driverId: ownerId, deletedAt: null })
      .exec();

    if (!availability) {
      throw new NotFoundException('Availability not found');
    }

    const pipeline = [
      { $match: { availabilityId } },
      {
        $lookup: {
          from: 'users',
          localField: 'enquiredBy',
          foreignField: '_id',
          as: 'enquirer',
        },
      },
      { $unwind: { path: '$enquirer', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          'enquirer.password': 0,
          'enquirer.otp': 0,
        },
      },
    ];

    const [data, meta] = await getPaginatedDataWithAggregation(
      this.enquiryModel,
      query,
      pipeline,
    );
    return { data, meta };
  }

  async respondToEnquiry(
    enquiryId: string,
    dto: RespondTaxiEnquiryDto,
    ownerId: string,
  ): Promise<TaxiEnquiryDocument> {
    const enquiry = await this.enquiryModel.findById(enquiryId).exec();
    if (!enquiry) {
      throw new NotFoundException('Enquiry not found');
    }

    const availability = await this.availabilityModel
      .findOne({ _id: enquiry.availabilityId, driverId: ownerId })
      .exec();

    if (!availability) {
      throw new ForbiddenException('You can only respond to enquiries on your availabilities');
    }

    enquiry.response = dto.response;
    enquiry.status = TaxiEnquiryStatus.RESPONDED;
    return enquiry.save();
  }
}
