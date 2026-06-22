import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import {
  ChatConversation,
  ChatConversationSchema,
} from 'src/services/mongoose/schemas/chat-conversation.schema';
import {
  ChatMessage,
  ChatMessageSchema,
} from 'src/services/mongoose/schemas/chat-message.schema';
import { Permission, PermissionSchema } from 'src/services/mongoose/schemas/permission.schema';
import { Role, RoleSchema } from 'src/services/mongoose/schemas/role.schema';
import { CaslAbilityFactory } from 'src/services/casl/casl-ability.factory';
import { PoliciesGuard } from 'src/services/casl/casl-policies.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChatConversation.name, schema: ChatConversationSchema },
      { name: ChatMessage.name, schema: ChatMessageSchema },
      { name: Permission.name, schema: PermissionSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService, CaslAbilityFactory, PoliciesGuard],
  exports: [ChatService],
})
export class ChatModule {}
