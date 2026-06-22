import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import commonFieldsPlugin from '../plugins/common-fields';

export type ChatConversationDocument = HydratedDocument<ChatConversation>;

@Schema({ collection: 'chat_conversations' })
export class ChatConversation {
  @ApiProperty()
  @Prop({ required: true, type: String, unique: true })
  _id: string;

  @ApiProperty()
  @Prop({ required: true, type: String, ref: 'User', index: true })
  participantOneId: string;

  @ApiProperty()
  @Prop({ required: true, type: String, ref: 'User', index: true })
  participantTwoId: string;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: Date })
  lastMessageAt?: Date;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}

export const ChatConversationSchema = SchemaFactory.createForClass(ChatConversation);
ChatConversationSchema.plugin(commonFieldsPlugin, { name: ChatConversation.name });
ChatConversationSchema.index(
  { participantOneId: 1, participantTwoId: 1 },
  { unique: true },
);
