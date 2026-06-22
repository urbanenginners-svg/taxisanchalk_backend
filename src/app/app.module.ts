import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from 'src/services/env/env.module';
import { AuthModule } from 'src/api/auth/auth.module';
import { AdminModule } from 'src/api/admin/admin.module';
import { RoleModule } from 'src/api/role/role.module';
import { FilesModule } from 'src/api/files/files.module';
import { TeamDriverModule } from 'src/api/team-driver/team-driver.module';
import { VehicleModule } from 'src/api/vehicle/vehicle.module';
import { BookingModule } from 'src/api/booking/booking.module';
import { TaxiAvailabilityModule } from 'src/api/taxi-availability/taxi-availability.module';
import { ChatModule } from 'src/api/chat/chat.module';
import { TicketModule } from 'src/api/ticket/ticket.module';
import { SeedModule } from 'src/api/seed/seed.module';
import { EmailModule } from 'src/services/email/email.module';
import { JwtAuthGuard } from 'src/services/auth/jwt-auth.guard';
import { ApiKeyAuthGuard } from 'src/services/auth/api-key-auth.guard';
import { User, UserSchema } from 'src/services/mongoose/schemas/user.schema';
import { SystemApiKey, SystemApiKeySchema } from 'src/services/mongoose/schemas/system-api-key.schema';

@Module({
  imports: [
    AppConfigModule,
    EmailModule,
    ScheduleModule.forRoot(),
    AuthModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: SystemApiKey.name, schema: SystemApiKeySchema },
    ]),
    AdminModule,
    RoleModule,
    FilesModule,
    TeamDriverModule,
    VehicleModule,
    BookingModule,
    TaxiAvailabilityModule,
    ChatModule,
    TicketModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ApiKeyAuthGuard,
    JwtAuthGuard,
    {
      provide: APP_GUARD,
      useClass: ApiKeyAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
