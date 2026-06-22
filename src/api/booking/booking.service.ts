import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Booking, BookingDocument } from 'src/services/mongoose/schemas/booking.schema';
import {
  BookingRequest,
  BookingRequestDocument,
} from 'src/services/mongoose/schemas/booking-request.schema';
import {
  CommissionPayment,
  CommissionPaymentDocument,
} from 'src/services/mongoose/schemas/commission-payment.schema';
import {
  CreateBookingDto,
  CreateBookingRequestDto,
  PayCommissionDto,
} from './dto';
import { BookingStatus } from 'src/utils/enums/booking-status.enum';
import { BookingRequestStatus } from 'src/utils/enums/booking-request-status.enum';
import { CommissionPaymentStatus } from 'src/utils/enums/commission-payment-status.enum';
import { CommonFieldsDto } from 'src/utils/dtos/common-fields.dto';
import { getPaginatedDataWithAggregation } from 'src/utils/services/get-paginated-data-aggregation.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
    @InjectModel(BookingRequest.name)
    private bookingRequestModel: Model<BookingRequest>,
    @InjectModel(CommissionPayment.name)
    private commissionPaymentModel: Model<CommissionPayment>,
  ) {}

  private sanitizeBookingForViewer(booking: any, viewerId: string, hasPaidCommission: boolean) {
    const isPublisher = booking.publishedBy === viewerId;
    const isAssignedDriver = booking.assignedDriverId === viewerId;

    if (isPublisher || (isAssignedDriver && hasPaidCommission)) {
      return booking;
    }

    const { customer, ...rest } = booking;
    return {
      ...rest,
      customer: {
        name: 'Hidden',
        phoneNumber: 'Hidden',
        email: 'Hidden',
        notes: 'Pay commission after acceptance to view customer details',
      },
    };
  }

  async create(dto: CreateBookingDto, driverId: string): Promise<BookingDocument> {
    const booking = new this.bookingModel({
      ...dto,
      travelDate: dto.travelDate ? new Date(dto.travelDate) : undefined,
      publishedBy: driverId,
      createdBy: driverId,
      status: BookingStatus.OPEN,
    });
    return booking.save();
  }

  async findOpenBookings(
    driverId: string,
    query: CommonFieldsDto,
  ): Promise<{ data: any[]; meta: any }> {
    const pipeline = [
      {
        $match: {
          status: BookingStatus.OPEN,
          publishedBy: { $ne: driverId },
          deletedAt: null,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'publishedBy',
          foreignField: '_id',
          as: 'publisher',
        },
      },
      { $unwind: { path: '$publisher', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          'publisher.password': 0,
          'publisher.otp': 0,
        },
      },
    ];

    const [data, meta] = await getPaginatedDataWithAggregation(
      this.bookingModel,
      query,
      pipeline,
    );

    const sanitizedData = data.map((booking) =>
      this.sanitizeBookingForViewer(booking, driverId, false),
    );

    return { data: sanitizedData, meta };
  }

  async findMyBookings(
    driverId: string,
    query: CommonFieldsDto,
  ): Promise<{ data: any[]; meta: any }> {
    const pipeline = [
      { $match: { publishedBy: driverId, deletedAt: null } },
    ];
    const [data, meta] = await getPaginatedDataWithAggregation(
      this.bookingModel,
      query,
      pipeline,
    );
    return { data, meta };
  }

  async findMyAcceptedBookings(
    driverId: string,
    query: CommonFieldsDto,
  ): Promise<{ data: any[]; meta: any }> {
    const pipeline = [
      { $match: { assignedDriverId: driverId, deletedAt: null } },
    ];
    const [data, meta] = await getPaginatedDataWithAggregation(
      this.bookingModel,
      query,
      pipeline,
    );

    const sanitizedData = [];
    for (const booking of data) {
      const hasPaid = await this.hasPaidCommission(booking._id, driverId);
      sanitizedData.push(
        this.sanitizeBookingForViewer(booking, driverId, hasPaid),
      );
    }

    return { data: sanitizedData, meta };
  }

  async findOne(id: string, viewerId: string): Promise<any> {
    const booking = await this.bookingModel
      .findOne({ _id: id, deletedAt: null })
      .populate('publishedBy', 'firstName lastName phoneNumber email')
      .lean()
      .exec();

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const hasPaid = await this.hasPaidCommission(id, viewerId);
    return this.sanitizeBookingForViewer(booking, viewerId, hasPaid);
  }

  async createRequest(
    bookingId: string,
    dto: CreateBookingRequestDto,
    requesterId: string,
  ): Promise<BookingRequestDocument> {
    const booking = await this.bookingModel
      .findOne({ _id: bookingId, deletedAt: null })
      .exec();

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.status !== BookingStatus.OPEN) {
      throw new BadRequestException('Booking is no longer open for requests');
    }

    if (booking.publishedBy === requesterId) {
      throw new BadRequestException('You cannot request your own booking');
    }

    const existing = await this.bookingRequestModel.findOne({
      bookingId,
      requestedBy: requesterId,
      status: { $ne: BookingRequestStatus.REJECTED },
    });

    if (existing) {
      throw new BadRequestException('You have already sent a request for this booking');
    }

    const request = new this.bookingRequestModel({
      bookingId,
      requestedBy: requesterId,
      message: dto.message,
      status: BookingRequestStatus.PENDING,
      createdBy: requesterId,
    });

    return request.save();
  }

  async getBookingRequests(
    bookingId: string,
    publisherId: string,
    query: CommonFieldsDto,
  ): Promise<{ data: any[]; meta: any }> {
    const booking = await this.bookingModel
      .findOne({ _id: bookingId, publishedBy: publisherId, deletedAt: null })
      .exec();

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const pipeline = [
      { $match: { bookingId } },
      {
        $lookup: {
          from: 'users',
          localField: 'requestedBy',
          foreignField: '_id',
          as: 'requester',
        },
      },
      { $unwind: { path: '$requester', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          'requester.password': 0,
          'requester.otp': 0,
        },
      },
    ];

    const [data, meta] = await getPaginatedDataWithAggregation(
      this.bookingRequestModel,
      query,
      pipeline,
    );
    return { data, meta };
  }

  async acceptRequest(
    bookingId: string,
    requestId: string,
    publisherId: string,
  ): Promise<BookingRequestDocument> {
    const booking = await this.bookingModel
      .findOne({ _id: bookingId, publishedBy: publisherId, deletedAt: null })
      .exec();

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.status !== BookingStatus.OPEN) {
      throw new BadRequestException('Booking already assigned');
    }

    const request = await this.bookingRequestModel
      .findOne({ _id: requestId, bookingId })
      .exec();

    if (!request) {
      throw new NotFoundException('Request not found');
    }

    if (request.status !== BookingRequestStatus.PENDING) {
      throw new BadRequestException('Request is not pending');
    }

    request.status = BookingRequestStatus.ACCEPTED;
    await request.save();

    await this.bookingRequestModel.updateMany(
      {
        bookingId,
        _id: { $ne: requestId },
        status: BookingRequestStatus.PENDING,
      },
      { status: BookingRequestStatus.REJECTED },
    );

    booking.status = BookingStatus.ASSIGNED;
    booking.assignedDriverId = request.requestedBy;
    await booking.save();

    return request;
  }

  async rejectRequest(
    bookingId: string,
    requestId: string,
    publisherId: string,
  ): Promise<BookingRequestDocument> {
    const booking = await this.bookingModel
      .findOne({ _id: bookingId, publishedBy: publisherId, deletedAt: null })
      .exec();

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const request = await this.bookingRequestModel
      .findOne({ _id: requestId, bookingId })
      .exec();

    if (!request) {
      throw new NotFoundException('Request not found');
    }

    if (request.status !== BookingRequestStatus.PENDING) {
      throw new BadRequestException('Request is not pending');
    }

    request.status = BookingRequestStatus.REJECTED;
    return request.save();
  }

  async payCommission(
    bookingId: string,
    dto: PayCommissionDto,
    driverId: string,
  ): Promise<CommissionPaymentDocument> {
    const booking = await this.bookingModel
      .findOne({ _id: bookingId, assignedDriverId: driverId, deletedAt: null })
      .exec();

    if (!booking) {
      throw new NotFoundException('Assigned booking not found');
    }

    const acceptedRequest = await this.bookingRequestModel.findOne({
      bookingId,
      requestedBy: driverId,
      status: BookingRequestStatus.ACCEPTED,
    });

    if (!acceptedRequest) {
      throw new BadRequestException('No accepted request found for this booking');
    }

    const existingPayment = await this.commissionPaymentModel.findOne({
      bookingRequestId: acceptedRequest._id,
      status: CommissionPaymentStatus.PAID,
    });

    if (existingPayment) {
      throw new BadRequestException('Commission already paid');
    }

    const payment = new this.commissionPaymentModel({
      bookingRequestId: acceptedRequest._id,
      bookingId,
      paidBy: driverId,
      amount: booking.commission,
      status: CommissionPaymentStatus.PAID,
      transactionReference: dto.transactionReference,
      createdBy: driverId,
    });

    return payment.save();
  }

  private async hasPaidCommission(bookingId: string, driverId: string): Promise<boolean> {
    const payment = await this.commissionPaymentModel.findOne({
      bookingId,
      paidBy: driverId,
      status: CommissionPaymentStatus.PAID,
    });
    return !!payment;
  }
}
