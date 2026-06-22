import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import commonFieldsPlugin from '../plugins/common-fields';
import { CommissionPaymentStatus } from 'src/utils/enums/commission-payment-status.enum';

export type CommissionPaymentDocument = HydratedDocument<CommissionPayment>;

@Schema({ collection: 'commission_payments' })
export class CommissionPayment {
  @ApiProperty()
  @Prop({ required: true, type: String, unique: true })
  _id: string;

  @ApiProperty()
  @Prop({ required: true, type: String, ref: 'BookingRequest', index: true })
  bookingRequestId: string;

  @ApiProperty()
  @Prop({ required: true, type: String, ref: 'Booking', index: true })
  bookingId: string;

  @ApiProperty()
  @Prop({ required: true, type: String, ref: 'User', index: true })
  paidBy: string;

  @ApiProperty()
  @Prop({ required: true, type: Number })
  amount: number;

  @ApiProperty({ enum: CommissionPaymentStatus })
  @Prop({
    required: true,
    type: String,
    enum: Object.values(CommissionPaymentStatus),
    default: CommissionPaymentStatus.PENDING,
  })
  status: CommissionPaymentStatus;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: String, trim: true })
  transactionReference?: string;

  @ApiProperty()
  @Prop({ required: false, type: String })
  createdBy?: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}

export const CommissionPaymentSchema = SchemaFactory.createForClass(CommissionPayment);
CommissionPaymentSchema.plugin(commonFieldsPlugin, { name: CommissionPayment.name });
