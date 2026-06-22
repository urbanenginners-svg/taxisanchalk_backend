import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Ticket, TicketDocument } from 'src/services/mongoose/schemas/ticket.schema';
import { CreateTicketDto, UpdateTicketStatusDto } from './dto';
import { TicketStatus } from 'src/utils/enums/ticket-status.enum';
import { CommonFieldsDto } from 'src/utils/dtos/common-fields.dto';
import { getPaginatedDataWithAggregation } from 'src/utils/services/get-paginated-data-aggregation.service';

@Injectable()
export class TicketService {
  constructor(@InjectModel(Ticket.name) private ticketModel: Model<Ticket>) {}

  async create(dto: CreateTicketDto, driverId: string): Promise<TicketDocument> {
    const ticket = new this.ticketModel({
      ...dto,
      raisedBy: driverId,
      createdBy: driverId,
      status: TicketStatus.OPEN,
    });
    return ticket.save();
  }

  async findMyTickets(
    driverId: string,
    query: CommonFieldsDto,
  ): Promise<{ data: any[]; meta: any }> {
    const pipeline = [{ $match: { raisedBy: driverId } }];
    const [data, meta] = await getPaginatedDataWithAggregation(
      this.ticketModel,
      query,
      pipeline,
    );
    return { data, meta };
  }

  async findAll(query: CommonFieldsDto): Promise<{ data: any[]; meta: any }> {
    const pipeline = [
      {
        $lookup: {
          from: 'users',
          localField: 'raisedBy',
          foreignField: '_id',
          as: 'raisedByUser',
        },
      },
      { $unwind: { path: '$raisedByUser', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'bookings',
          localField: 'bookingId',
          foreignField: '_id',
          as: 'booking',
        },
      },
      { $unwind: { path: '$booking', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          'raisedByUser.password': 0,
          'raisedByUser.otp': 0,
        },
      },
    ];
    const [data, meta] = await getPaginatedDataWithAggregation(
      this.ticketModel,
      query,
      pipeline,
    );
    return { data, meta };
  }

  async findOne(id: string): Promise<TicketDocument> {
    const ticket = await this.ticketModel
      .findById(id)
      .populate('raisedBy', 'firstName lastName email phoneNumber')
      .populate('bookingId')
      .exec();
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    return ticket;
  }

  async updateStatus(
    id: string,
    dto: UpdateTicketStatusDto,
    adminId: string,
  ): Promise<TicketDocument> {
    const ticket = await this.ticketModel.findById(id).exec();
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    if (!Object.values(TicketStatus).includes(dto.status as TicketStatus)) {
      throw new BadRequestException('Invalid ticket status');
    }

    ticket.status = dto.status as TicketStatus;
    if (dto.adminNotes) {
      ticket.adminNotes = dto.adminNotes;
    }

    if (
      dto.status === TicketStatus.RESOLVED ||
      dto.status === TicketStatus.CLOSED
    ) {
      ticket.resolvedBy = adminId;
      ticket.resolvedAt = new Date();
    }

    return ticket.save();
  }
}
