import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TaxiAvailabilityController } from './taxi-availability.controller';
import { TaxiAvailabilityService } from './taxi-availability.service';
import {
  TaxiAvailability,
  TaxiAvailabilitySchema,
} from 'src/services/mongoose/schemas/taxi-availability.schema';
import {
  TaxiEnquiry,
  TaxiEnquirySchema,
} from 'src/services/mongoose/schemas/taxi-enquiry.schema';
import { Permission, PermissionSchema } from 'src/services/mongoose/schemas/permission.schema';
import { Role, RoleSchema } from 'src/services/mongoose/schemas/role.schema';
import { CaslAbilityFactory } from 'src/services/casl/casl-ability.factory';
import { PoliciesGuard } from 'src/services/casl/casl-policies.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaxiAvailability.name, schema: TaxiAvailabilitySchema },
      { name: TaxiEnquiry.name, schema: TaxiEnquirySchema },
      { name: Permission.name, schema: PermissionSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [TaxiAvailabilityController],
  providers: [TaxiAvailabilityService, CaslAbilityFactory, PoliciesGuard],
  exports: [TaxiAvailabilityService],
})
export class TaxiAvailabilityModule {}
