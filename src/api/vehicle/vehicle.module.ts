import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { Vehicle, VehicleSchema } from 'src/services/mongoose/schemas/vehicle.schema';
import { Permission, PermissionSchema } from 'src/services/mongoose/schemas/permission.schema';
import { Role, RoleSchema } from 'src/services/mongoose/schemas/role.schema';
import { CaslAbilityFactory } from 'src/services/casl/casl-ability.factory';
import { PoliciesGuard } from 'src/services/casl/casl-policies.guard';
import { TeamDriverModule } from 'src/api/team-driver/team-driver.module';

@Module({
  imports: [
    TeamDriverModule,
    MongooseModule.forFeature([
      { name: Vehicle.name, schema: VehicleSchema },
      { name: Permission.name, schema: PermissionSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [VehicleController],
  providers: [VehicleService, CaslAbilityFactory, PoliciesGuard],
  exports: [VehicleService],
})
export class VehicleModule {}
