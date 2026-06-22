import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import commonFieldsPlugin from '../plugins/common-fields';

export type TeamDriverDocument = HydratedDocument<TeamDriver>;

@Schema({ collection: 'team_drivers' })
export class TeamDriver {
  @ApiProperty()
  @Prop({ required: true, type: String, unique: true })
  _id: string;

  @ApiProperty()
  @Prop({ required: true, type: String, trim: true })
  firstName: string;

  @ApiProperty()
  @Prop({ required: true, type: String, trim: true })
  lastName: string;

  @ApiProperty()
  @Prop({ required: true, type: String, trim: true })
  phoneNumber: string;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: String, trim: true })
  email?: string;

  @ApiProperty()
  @Prop({ required: true, type: String, ref: 'User', index: true })
  parentDriverId: string;

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

export const TeamDriverSchema = SchemaFactory.createForClass(TeamDriver);
TeamDriverSchema.plugin(commonFieldsPlugin, { name: TeamDriver.name });
