import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking, BookingSchema } from 'src/services/mongoose/schemas/booking.schema';
import {
  BookingRequest,
  BookingRequestSchema,
} from 'src/services/mongoose/schemas/booking-request.schema';
import {
  CommissionPayment,
  CommissionPaymentSchema,
} from 'src/services/mongoose/schemas/commission-payment.schema';
import { Permission, PermissionSchema } from 'src/services/mongoose/schemas/permission.schema';
import { Role, RoleSchema } from 'src/services/mongoose/schemas/role.schema';
import { CaslAbilityFactory } from 'src/services/casl/casl-ability.factory';
import { PoliciesGuard } from 'src/services/casl/casl-policies.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: BookingRequest.name, schema: BookingRequestSchema },
      { name: CommissionPayment.name, schema: CommissionPaymentSchema },
      { name: Permission.name, schema: PermissionSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService, CaslAbilityFactory, PoliciesGuard],
  exports: [BookingService],
})
export class BookingModule {}
