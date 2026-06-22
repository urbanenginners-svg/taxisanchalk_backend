import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import commonFieldsPlugin from '../plugins/common-fields';
import { BookingStatus } from 'src/utils/enums/booking-status.enum';

@Schema({ _id: false })
export class BookingCustomer {
  @ApiProperty()
  @Prop({ required: true, type: String, trim: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true, type: String, trim: true })
  phoneNumber: string;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: String, trim: true })
  email?: string;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: String, trim: true })
  notes?: string;
}
const BookingCustomerSchema = SchemaFactory.createForClass(BookingCustomer);

export type BookingDocument = HydratedDocument<Booking>;

@Schema({ collection: 'bookings' })
export class Booking {
  @ApiProperty()
  @Prop({ required: true, type: String, unique: true })
  _id: string;

  @ApiProperty()
  @Prop({ required: true, type: String, trim: true })
  fromLocation: string;

  @ApiProperty()
  @Prop({ required: true, type: String, trim: true })
  toLocation: string;

  @ApiProperty()
  @Prop({ required: true, type: Number })
  actualPrice: number;

  @ApiProperty()
  @Prop({ required: true, type: Number })
  commission: number;

  @ApiProperty({ type: () => BookingCustomer })
  @Prop({ required: true, type: BookingCustomerSchema })
  customer: BookingCustomer;

  @ApiProperty()
  @Prop({ required: true, type: String, ref: 'User', index: true })
  publishedBy: string;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: String, ref: 'User', default: null })
  assignedDriverId?: string;

  @ApiProperty({ enum: BookingStatus })
  @Prop({
    required: true,
    type: String,
    enum: Object.values(BookingStatus),
    default: BookingStatus.OPEN,
  })
  status: BookingStatus;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: Date })
  travelDate?: Date;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: String, trim: true })
  notes?: string;

  @ApiProperty()
  @Prop({ required: false, type: String })
  createdBy?: string;

  @ApiProperty()
  @Prop({ required: false, type: Date })
  deletedAt?: Date;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
BookingSchema.plugin(commonFieldsPlugin, { name: Booking.name });
