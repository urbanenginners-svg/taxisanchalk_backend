import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TeamDriverController } from './team-driver.controller';
import { TeamDriverService } from './team-driver.service';
import {
  TeamDriver,
  TeamDriverSchema,
} from 'src/services/mongoose/schemas/team-driver.schema';
import { Permission, PermissionSchema } from 'src/services/mongoose/schemas/permission.schema';
import { Role, RoleSchema } from 'src/services/mongoose/schemas/role.schema';
import { CaslAbilityFactory } from 'src/services/casl/casl-ability.factory';
import { PoliciesGuard } from 'src/services/casl/casl-policies.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamDriver.name, schema: TeamDriverSchema },
      { name: Permission.name, schema: PermissionSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [TeamDriverController],
  providers: [TeamDriverService, CaslAbilityFactory, PoliciesGuard],
  exports: [TeamDriverService],
})
export class TeamDriverModule {}
