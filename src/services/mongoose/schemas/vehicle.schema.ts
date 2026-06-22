import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import commonFieldsPlugin from '../plugins/common-fields';

export type VehicleDocument = HydratedDocument<Vehicle>;

@Schema({ collection: 'vehicles' })
export class Vehicle {
  @ApiProperty()
  @Prop({ required: true, type: String, unique: true })
  _id: string;

  @ApiProperty()
  @Prop({ required: true, type: String, trim: true, unique: true })
  vehicleNumber: string;

  @ApiProperty()
  @Prop({ required: true, type: String, trim: true })
  carName: string;

  @ApiProperty()
  @Prop({ required: true, type: Number })
  registrationYear: number;

  @ApiProperty()
  @Prop({ required: true, type: String, trim: true })
  manufacturerName: string;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: String, ref: 'TeamDriver', default: null })
  assignedTeamDriverId?: string;

  @ApiProperty()
  @Prop({ required: true, type: String, ref: 'User', index: true })
  registeredBy: string;

  @ApiProperty()
  @Prop({ required: true, type: Boolean, default: true })
  isActive: boolean;

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

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
VehicleSchema.plugin(commonFieldsPlugin, { name: Vehicle.name });
