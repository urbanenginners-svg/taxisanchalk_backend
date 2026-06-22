import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BookingService } from './booking.service';
import {
  CreateBookingDto,
  CreateBookingRequestDto,
  PayCommissionDto,
} from './dto';
import { DataResponse, PaginatedDataResponse } from 'src/utils/response';
import { PoliciesGuard } from 'src/services/casl/casl-policies.guard';
import { CheckActionPolicy } from 'src/services/casl/casl-policies.decorator';
import { PermissionEnum } from 'src/utils/enums/permission.enum';
import { resource } from 'src/utils/constants/resource';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { CommonFieldsDto } from 'src/utils/dtos/common-fields.dto';

@ApiTags('Bookings')
@Controller('bookings')
@UseGuards(PoliciesGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Version('1')
  @Post()
  @CheckActionPolicy(PermissionEnum.WRITE, resource.Booking)
  async create(@Body() dto: CreateBookingDto, @GetUser('sub') userId: string) {
    const result = await this.bookingService.create(dto, userId);
    return new DataResponse(result);
  }

  @Version('1')
  @Get('open')
  @CheckActionPolicy(PermissionEnum.READ, resource.Booking)
  async findOpen(@Query() query: CommonFieldsDto, @GetUser('sub') userId: string) {
    const result = await this.bookingService.findOpenBookings(userId, query);
    return new PaginatedDataResponse(result.data, result.meta);
  }

  @Version('1')
  @Get('my')
  @CheckActionPolicy(PermissionEnum.READ, resource.Booking)
  async findMy(@Query() query: CommonFieldsDto, @GetUser('sub') userId: string) {
    const result = await this.bookingService.findMyBookings(userId, query);
    return new PaginatedDataResponse(result.data, result.meta);
  }

  @Version('1')
  @Get('my-accepted')
  @CheckActionPolicy(PermissionEnum.READ, resource.Booking)
  async findMyAccepted(
    @Query() query: CommonFieldsDto,
    @GetUser('sub') userId: string,
  ) {
    const result = await this.bookingService.findMyAcceptedBookings(userId, query);
    return new PaginatedDataResponse(result.data, result.meta);
  }

  @Version('1')
  @Get(':id')
  @CheckActionPolicy(PermissionEnum.READ, resource.Booking)
  async findOne(@Param('id') id: string, @GetUser('sub') userId: string) {
    const result = await this.bookingService.findOne(id, userId);
    return new DataResponse(result);
  }

  @Version('1')
  @Post(':id/requests')
  @CheckActionPolicy(PermissionEnum.WRITE, resource.BookingRequest)
  async createRequest(
    @Param('id') id: string,
    @Body() dto: CreateBookingRequestDto,
    @GetUser('sub') userId: string,
  ) {
    const result = await this.bookingService.createRequest(id, dto, userId);
    return new DataResponse(result);
  }

  @Version('1')
  @Get(':id/requests')
  @CheckActionPolicy(PermissionEnum.READ, resource.BookingRequest)
  async getRequests(
    @Param('id') id: string,
    @Query() query: CommonFieldsDto,
    @GetUser('sub') userId: string,
  ) {
    const result = await this.bookingService.getBookingRequests(id, userId, query);
    return new PaginatedDataResponse(result.data, result.meta);
  }

  @Version('1')
  @Patch(':bookingId/requests/:requestId/accept')
  @CheckActionPolicy(PermissionEnum.UPDATE, resource.BookingRequest)
  async acceptRequest(
    @Param('bookingId') bookingId: string,
    @Param('requestId') requestId: string,
    @GetUser('sub') userId: string,
  ) {
    const result = await this.bookingService.acceptRequest(
      bookingId,
      requestId,
      userId,
    );
    return new DataResponse(result);
  }

  @Version('1')
  @Patch(':bookingId/requests/:requestId/reject')
  @CheckActionPolicy(PermissionEnum.UPDATE, resource.BookingRequest)
  async rejectRequest(
    @Param('bookingId') bookingId: string,
    @Param('requestId') requestId: string,
    @GetUser('sub') userId: string,
  ) {
    const result = await this.bookingService.rejectRequest(
      bookingId,
      requestId,
      userId,
    );
    return new DataResponse(result);
  }

  @Version('1')
  @Post(':id/pay-commission')
  @CheckActionPolicy(PermissionEnum.WRITE, resource.CommissionPayment)
  async payCommission(
    @Param('id') id: string,
    @Body() dto: PayCommissionDto,
    @GetUser('sub') userId: string,
  ) {
    const result = await this.bookingService.payCommission(id, dto, userId);
    return new DataResponse(result);
  }
}
