import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import commonFieldsPlugin from '../plugins/common-fields';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { Role } from './role.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users' })
export class User {
  @ApiProperty()
  @Prop({ required: true, type: String, unique: true })
  _id: string;

  @ApiProperty()
  @Prop({ required: false, type: String, trim: true })
  firstName?: string;

  @ApiProperty()
  @Prop({ required: false, type: String, trim: true })
  lastName?: string;

  @ApiProperty({ required: false, example: 'user@example.com' })
  @Prop({ required: false, unique: true, sparse: true })
  email?: string;

  @ApiProperty()
  @Prop({ required: false, unique: true, sparse: true })
  phoneNumber?: string;

  @Prop({ select: false })
  otp?: string;

  @Prop({ required: false, type: Date })
  otpExpiresAt?: Date;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: String, ref: 'File' })
  profilePic?: string;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: Date })
  dateOfBirth?: Date;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: String, trim: true })
  address?: string;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: String, trim: true })
  state?: string;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: String, trim: true })
  city?: string;

  @Prop({ required: false, select: false })
  password?: string;

  @ApiProperty({ type: String })
  @Prop({ type: String, ref: 'Role' })
  role: string | Role;

  @ApiProperty()
  @Prop({ required: true, type: Boolean, default: true })
  isActive: boolean;

  @ApiProperty()
  @Prop({ required: false, type: String })
  createdBy?: string;

  @ApiProperty()
  @Prop({ required: false, type: String })
  lastUpdatedBy?: string;

  @ApiProperty()
  @Prop({ required: false, type: String })
  deletedBy?: string;

  @ApiProperty()
  @Prop({ required: false, type: Date })
  deletedAt?: Date;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(commonFieldsPlugin, { name: User.name });
