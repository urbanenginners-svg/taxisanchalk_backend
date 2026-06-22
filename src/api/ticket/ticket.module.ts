import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { Ticket, TicketSchema } from 'src/services/mongoose/schemas/ticket.schema';
import { Permission, PermissionSchema } from 'src/services/mongoose/schemas/permission.schema';
import { Role, RoleSchema } from 'src/services/mongoose/schemas/role.schema';
import { CaslAbilityFactory } from 'src/services/casl/casl-ability.factory';
import { PoliciesGuard } from 'src/services/casl/casl-policies.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ticket.name, schema: TicketSchema },
      { name: Permission.name, schema: PermissionSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [TicketController],
  providers: [TicketService, CaslAbilityFactory, PoliciesGuard],
  exports: [TicketService],
})
export class TicketModule {}
