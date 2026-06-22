import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ChatService } from './chat.service';
import { SendMessageDto, StartConversationDto } from './dto';
import { DataResponse, PaginatedDataResponse } from 'src/utils/response';
import { PoliciesGuard } from 'src/services/casl/casl-policies.guard';
import { CheckActionPolicy } from 'src/services/casl/casl-policies.decorator';
import { PermissionEnum } from 'src/utils/enums/permission.enum';
import { resource } from 'src/utils/constants/resource';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { CommonFieldsDto } from 'src/utils/dtos/common-fields.dto';

@ApiTags('Chat')
@Controller('chat')
@UseGuards(PoliciesGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Version('1')
  @Post('conversations')
  @CheckActionPolicy(PermissionEnum.WRITE, resource.Chat)
  async startConversation(
    @Body() dto: StartConversationDto,
    @GetUser('sub') userId: string,
  ) {
    const result = await this.chatService.startOrGetConversation(dto, userId);
    return new DataResponse(result);
  }

  @Version('1')
  @Get('conversations')
  @CheckActionPolicy(PermissionEnum.READ, resource.Chat)
  async getConversations(
    @Query() query: CommonFieldsDto,
    @GetUser('sub') userId: string,
  ) {
    const result = await this.chatService.getMyConversations(userId, query);
    return new PaginatedDataResponse(result.data, result.meta);
  }

  @Version('1')
  @Post('conversations/:id/messages')
  @CheckActionPolicy(PermissionEnum.WRITE, resource.Chat)
  async sendMessage(
    @Param('id') id: string,
    @Body() dto: SendMessageDto,
    @GetUser('sub') userId: string,
  ) {
    const result = await this.chatService.sendMessage(id, dto, userId);
    return new DataResponse(result);
  }

  @Version('1')
  @Get('conversations/:id/messages')
  @CheckActionPolicy(PermissionEnum.READ, resource.Chat)
  async getMessages(
    @Param('id') id: string,
    @Query() query: CommonFieldsDto,
    @GetUser('sub') userId: string,
  ) {
    const result = await this.chatService.getMessages(id, userId, query);
    return new PaginatedDataResponse(result.data, result.meta);
  }
}
