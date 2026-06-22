import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  ChatConversation,
  ChatConversationDocument,
} from 'src/services/mongoose/schemas/chat-conversation.schema';
import {
  ChatMessage,
  ChatMessageDocument,
} from 'src/services/mongoose/schemas/chat-message.schema';
import { SendMessageDto, StartConversationDto } from './dto';
import { CommonFieldsDto } from 'src/utils/dtos/common-fields.dto';
import { getPaginatedDataWithAggregation } from 'src/utils/services/get-paginated-data-aggregation.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatConversation.name)
    private conversationModel: Model<ChatConversation>,
    @InjectModel(ChatMessage.name)
    private messageModel: Model<ChatMessage>,
  ) {}

  private sortParticipantIds(id1: string, id2: string): [string, string] {
    return id1 < id2 ? [id1, id2] : [id2, id1];
  }

  async startOrGetConversation(
    dto: StartConversationDto,
    userId: string,
  ): Promise<ChatConversationDocument> {
    if (dto.participantId === userId) {
      throw new BadRequestException('Cannot start a conversation with yourself');
    }

    const [participantOneId, participantTwoId] = this.sortParticipantIds(
      userId,
      dto.participantId,
    );

    let conversation = await this.conversationModel
      .findOne({ participantOneId, participantTwoId })
      .exec();

    if (!conversation) {
      conversation = new this.conversationModel({
        participantOneId,
        participantTwoId,
      });
      await conversation.save();
    }

    return conversation;
  }

  async getMyConversations(
    userId: string,
    query: CommonFieldsDto,
  ): Promise<{ data: any[]; meta: any }> {
    const pipeline = [
      {
        $match: {
          $or: [{ participantOneId: userId }, { participantTwoId: userId }],
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'participantOneId',
          foreignField: '_id',
          as: 'participantOne',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'participantTwoId',
          foreignField: '_id',
          as: 'participantTwo',
        },
      },
      { $unwind: { path: '$participantOne', preserveNullAndEmptyArrays: true } },
      { $unwind: { path: '$participantTwo', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          'participantOne.password': 0,
          'participantOne.otp': 0,
          'participantTwo.password': 0,
          'participantTwo.otp': 0,
        },
      },
    ];

    const [data, meta] = await getPaginatedDataWithAggregation(
      this.conversationModel,
      query,
      pipeline,
    );
    return { data, meta };
  }

  private async assertParticipant(
    conversationId: string,
    userId: string,
  ): Promise<ChatConversationDocument> {
    const conversation = await this.conversationModel.findById(conversationId).exec();
    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    const isParticipant =
      conversation.participantOneId === userId ||
      conversation.participantTwoId === userId;

    if (!isParticipant) {
      throw new ForbiddenException('You are not part of this conversation');
    }

    return conversation;
  }

  async sendMessage(
    conversationId: string,
    dto: SendMessageDto,
    senderId: string,
  ): Promise<ChatMessageDocument> {
    const conversation = await this.assertParticipant(conversationId, senderId);

    const message = new this.messageModel({
      conversationId,
      senderId,
      message: dto.message,
    });
    await message.save();

    conversation.lastMessageAt = new Date();
    await conversation.save();

    return message;
  }

  async getMessages(
    conversationId: string,
    userId: string,
    query: CommonFieldsDto,
  ): Promise<{ data: any[]; meta: any }> {
    await this.assertParticipant(conversationId, userId);

    const pipeline = [{ $match: { conversationId } }];
    const [data, meta] = await getPaginatedDataWithAggregation(
      this.messageModel,
      query,
      pipeline,
    );
    return { data, meta };
  }
}
