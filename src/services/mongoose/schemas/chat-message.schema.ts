import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import commonFieldsPlugin from '../plugins/common-fields';

export type ChatMessageDocument = HydratedDocument<ChatMessage>;

@Schema({ collection: 'chat_messages' })
export class ChatMessage {
  @ApiProperty()
  @Prop({ required: true, type: String, unique: true })
  _id: string;

  @ApiProperty()
  @Prop({ required: true, type: String, ref: 'ChatConversation', index: true })
  conversationId: string;

  @ApiProperty()
  @Prop({ required: true, type: String, ref: 'User', index: true })
  senderId: string;

  @ApiProperty()
  @Prop({ required: true, type: String, trim: true })
  message: string;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: Date, default: null })
  readAt?: Date;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);
ChatMessageSchema.plugin(commonFieldsPlugin, { name: ChatMessage.name });
