import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TaxiAvailabilityService } from './taxi-availability.service';
import {
  CreateTaxiAvailabilityDto,
  CreateTaxiEnquiryDto,
  RespondTaxiEnquiryDto,
} from './dto';
import { DataResponse, PaginatedDataResponse } from 'src/utils/response';
import { PoliciesGuard } from 'src/services/casl/casl-policies.guard';
import { CheckActionPolicy } from 'src/services/casl/casl-policies.decorator';
import { PermissionEnum } from 'src/utils/enums/permission.enum';
import { resource } from 'src/utils/constants/resource';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { CommonFieldsDto } from 'src/utils/dtos/common-fields.dto';

@ApiTags('Taxi Availability')
@Controller('taxi-availabilities')
@UseGuards(PoliciesGuard)
export class TaxiAvailabilityController {
  constructor(private readonly taxiAvailabilityService: TaxiAvailabilityService) {}

  @Version('1')
  @Post()
  @CheckActionPolicy(PermissionEnum.WRITE, resource.TaxiAvailability)
  async create(
    @Body() dto: CreateTaxiAvailabilityDto,
    @GetUser('sub') userId: string,
  ) {
    const result = await this.taxiAvailabilityService.create(dto, userId);
    return new DataResponse(result);
  }

  @Version('1')
  @Get('active')
  @CheckActionPolicy(PermissionEnum.READ, resource.TaxiAvailability)
  async findActive(@Query() query: CommonFieldsDto, @GetUser('sub') userId: string) {
    const result = await this.taxiAvailabilityService.findAllActive(userId, query);
    return new PaginatedDataResponse(result.data, result.meta);
  }

  @Version('1')
  @Get('my')
  @CheckActionPolicy(PermissionEnum.READ, resource.TaxiAvailability)
  async findMy(@Query() query: CommonFieldsDto, @GetUser('sub') userId: string) {
    const result = await this.taxiAvailabilityService.findMyAvailabilities(userId, query);
    return new PaginatedDataResponse(result.data, result.meta);
  }

  @Version('1')
  @Patch(':id/deactivate')
  @CheckActionPolicy(PermissionEnum.UPDATE, resource.TaxiAvailability)
  async deactivate(@Param('id') id: string, @GetUser('sub') userId: string) {
    const result = await this.taxiAvailabilityService.deactivate(id, userId);
    return new DataResponse(result);
  }

  @Version('1')
  @Post(':id/enquiries')
  @CheckActionPolicy(PermissionEnum.WRITE, resource.TaxiEnquiry)
  async createEnquiry(
    @Param('id') id: string,
    @Body() dto: CreateTaxiEnquiryDto,
    @GetUser('sub') userId: string,
  ) {
    const result = await this.taxiAvailabilityService.createEnquiry(id, dto, userId);
    return new DataResponse(result);
  }

  @Version('1')
  @Get(':id/enquiries')
  @CheckActionPolicy(PermissionEnum.READ, resource.TaxiEnquiry)
  async getEnquiries(
    @Param('id') id: string,
    @Query() query: CommonFieldsDto,
    @GetUser('sub') userId: string,
  ) {
    const result = await this.taxiAvailabilityService.getEnquiriesForAvailability(
      id,
      userId,
      query,
    );
    return new PaginatedDataResponse(result.data, result.meta);
  }

  @Version('1')
  @Patch('enquiries/:enquiryId/respond')
  @CheckActionPolicy(PermissionEnum.UPDATE, resource.TaxiEnquiry)
  async respondToEnquiry(
    @Param('enquiryId') enquiryId: string,
    @Body() dto: RespondTaxiEnquiryDto,
    @GetUser('sub') userId: string,
  ) {
    const result = await this.taxiAvailabilityService.respondToEnquiry(
      enquiryId,
      dto,
      userId,
    );
    return new DataResponse(result);
  }
}
