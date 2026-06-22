import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import commonFieldsPlugin from '../plugins/common-fields';
import { BookingRequestStatus } from 'src/utils/enums/booking-request-status.enum';

export type BookingRequestDocument = HydratedDocument<BookingRequest>;

@Schema({ collection: 'booking_requests' })
export class BookingRequest {
  @ApiProperty()
  @Prop({ required: true, type: String, unique: true })
  _id: string;

  @ApiProperty()
  @Prop({ required: true, type: String, ref: 'Booking', index: true })
  bookingId: string;

  @ApiProperty()
  @Prop({ required: true, type: String, ref: 'User', index: true })
  requestedBy: string;

  @ApiProperty()
  @Prop({ required: true, type: String, trim: true })
  message: string;

  @ApiProperty({ enum: BookingRequestStatus })
  @Prop({
    required: true,
    type: String,
    enum: Object.values(BookingRequestStatus),
    default: BookingRequestStatus.PENDING,
  })
  status: BookingRequestStatus;

  @ApiProperty()
  @Prop({ required: false, type: String })
  createdBy?: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}

export const BookingRequestSchema = SchemaFactory.createForClass(BookingRequest);
BookingRequestSchema.plugin(commonFieldsPlugin, { name: BookingRequest.name });
