import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import commonFieldsPlugin from '../plugins/common-fields';
import { TaxiAvailabilityStatus } from 'src/utils/enums/taxi-availability-status.enum';

export type TaxiAvailabilityDocument = HydratedDocument<TaxiAvailability>;

@Schema({ collection: 'taxi_availabilities' })
export class TaxiAvailability {
  @ApiProperty()
  @Prop({ required: true, type: String, unique: true })
  _id: string;

  @ApiProperty()
  @Prop({ required: true, type: String, ref: 'User', index: true })
  driverId: string;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: String, ref: 'Vehicle' })
  vehicleId?: string;

  @ApiProperty()
  @Prop({ required: true, type: String, trim: true })
  fromLocation: string;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: String, trim: true })
  toLocation?: string;

  @ApiProperty()
  @Prop({ required: true, type: Date })
  availableFrom: Date;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: Date })
  availableUntil?: Date;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: String, trim: true })
  description?: string;

  @ApiProperty({ enum: TaxiAvailabilityStatus })
  @Prop({
    required: true,
    type: String,
    enum: Object.values(TaxiAvailabilityStatus),
    default: TaxiAvailabilityStatus.ACTIVE,
  })
  status: TaxiAvailabilityStatus;

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

export const TaxiAvailabilitySchema = SchemaFactory.createForClass(TaxiAvailability);
TaxiAvailabilitySchema.plugin(commonFieldsPlugin, { name: TaxiAvailability.name });
