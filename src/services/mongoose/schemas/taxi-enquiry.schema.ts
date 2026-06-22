import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import commonFieldsPlugin from '../plugins/common-fields';
import { TaxiEnquiryStatus } from 'src/utils/enums/taxi-enquiry-status.enum';

export type TaxiEnquiryDocument = HydratedDocument<TaxiEnquiry>;

@Schema({ collection: 'taxi_enquiries' })
export class TaxiEnquiry {
  @ApiProperty()
  @Prop({ required: true, type: String, unique: true })
  _id: string;

  @ApiProperty()
  @Prop({ required: true, type: String, ref: 'TaxiAvailability', index: true })
  availabilityId: string;

  @ApiProperty()
  @Prop({ required: true, type: String, ref: 'User', index: true })
  enquiredBy: string;

  @ApiProperty()
  @Prop({ required: true, type: String, trim: true })
  message: string;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: String, trim: true })
  response?: string;

  @ApiProperty({ enum: TaxiEnquiryStatus })
  @Prop({
    required: true,
    type: String,
    enum: Object.values(TaxiEnquiryStatus),
    default: TaxiEnquiryStatus.PENDING,
  })
  status: TaxiEnquiryStatus;

  @ApiProperty()
  @Prop({ required: false, type: String })
  createdBy?: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}

export const TaxiEnquirySchema = SchemaFactory.createForClass(TaxiEnquiry);
TaxiEnquirySchema.plugin(commonFieldsPlugin, { name: TaxiEnquiry.name });
