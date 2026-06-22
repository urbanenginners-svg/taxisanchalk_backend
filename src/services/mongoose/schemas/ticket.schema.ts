import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import commonFieldsPlugin from '../plugins/common-fields';
import { TicketStatus } from 'src/utils/enums/ticket-status.enum';

export type TicketDocument = HydratedDocument<Ticket>;

@Schema({ collection: 'tickets' })
export class Ticket {
  @ApiProperty()
  @Prop({ required: true, type: String, unique: true })
  _id: string;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: String, ref: 'Booking', index: true })
  bookingId?: string;

  @ApiProperty()
  @Prop({ required: true, type: String, ref: 'User', index: true })
  raisedBy: string;

  @ApiProperty()
  @Prop({ required: true, type: String, trim: true })
  subject: string;

  @ApiProperty()
  @Prop({ required: true, type: String, trim: true })
  description: string;

  @ApiProperty({ enum: TicketStatus })
  @Prop({
    required: true,
    type: String,
    enum: Object.values(TicketStatus),
    default: TicketStatus.OPEN,
  })
  status: TicketStatus;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: String, trim: true })
  adminNotes?: string;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: String, ref: 'User' })
  resolvedBy?: string;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: Date })
  resolvedAt?: Date;

  @ApiProperty()
  @Prop({ required: false, type: String })
  createdBy?: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
TicketSchema.plugin(commonFieldsPlugin, { name: Ticket.name });
