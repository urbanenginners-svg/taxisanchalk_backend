import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { VehicleService } from './vehicle.service';
import { AssignTeamDriverDto, CreateVehicleDto, UpdateVehicleDto } from './dto';
import { DataResponse, PaginatedDataResponse } from 'src/utils/response';
import { PoliciesGuard } from 'src/services/casl/casl-policies.guard';
import { CheckActionPolicy } from 'src/services/casl/casl-policies.decorator';
import { PermissionEnum } from 'src/utils/enums/permission.enum';
import { resource } from 'src/utils/constants/resource';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { CommonFieldsDto } from 'src/utils/dtos/common-fields.dto';

@ApiTags('Vehicles')
@Controller('vehicles')
@UseGuards(PoliciesGuard)
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Version('1')
  @Post()
  @CheckActionPolicy(PermissionEnum.WRITE, resource.Vehicle)
  async create(@Body() dto: CreateVehicleDto, @GetUser('sub') userId: string) {
    const result = await this.vehicleService.create(dto, userId);
    return new DataResponse(result);
  }

  @Version('1')
  @Get()
  @CheckActionPolicy(PermissionEnum.READ, resource.Vehicle)
  async findAll(@Query() query: CommonFieldsDto, @GetUser('sub') userId: string) {
    const result = await this.vehicleService.findAll(userId, query);
    return new PaginatedDataResponse(result.data, result.meta);
  }

  @Version('1')
  @Get(':id')
  @CheckActionPolicy(PermissionEnum.READ, resource.Vehicle)
  async findOne(@Param('id') id: string, @GetUser('sub') userId: string) {
    const result = await this.vehicleService.findOne(id, userId);
    return new DataResponse(result);
  }

  @Version('1')
  @Put(':id')
  @CheckActionPolicy(PermissionEnum.UPDATE, resource.Vehicle)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateVehicleDto,
    @GetUser('sub') userId: string,
  ) {
    const result = await this.vehicleService.update(id, dto, userId);
    return new DataResponse(result);
  }

  @Version('1')
  @Patch(':id/assign-driver')
  @CheckActionPolicy(PermissionEnum.UPDATE, resource.Vehicle)
  async assignDriver(
    @Param('id') id: string,
    @Body() dto: AssignTeamDriverDto,
    @GetUser('sub') userId: string,
  ) {
    const result = await this.vehicleService.assignDriver(id, dto, userId);
    return new DataResponse(result);
  }

  @Version('1')
  @Delete(':id')
  @CheckActionPolicy(PermissionEnum.DELETE, resource.Vehicle)
  async remove(@Param('id') id: string, @GetUser('sub') userId: string) {
    const result = await this.vehicleService.remove(id, userId);
    return new DataResponse(result, 'Vehicle removed successfully');
  }
}
