import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TeamDriverService } from './team-driver.service';
import { CreateTeamDriverDto, UpdateTeamDriverDto } from './dto';
import { DataResponse, PaginatedDataResponse } from 'src/utils/response';
import { PoliciesGuard } from 'src/services/casl/casl-policies.guard';
import { CheckActionPolicy } from 'src/services/casl/casl-policies.decorator';
import { PermissionEnum } from 'src/utils/enums/permission.enum';
import { resource } from 'src/utils/constants/resource';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { CommonFieldsDto } from 'src/utils/dtos/common-fields.dto';

@ApiTags('Team Drivers')
@Controller('team-drivers')
@UseGuards(PoliciesGuard)
export class TeamDriverController {
  constructor(private readonly teamDriverService: TeamDriverService) {}

  @Version('1')
  @Post()
  @CheckActionPolicy(PermissionEnum.WRITE, resource.TeamDriver)
  async create(
    @Body() dto: CreateTeamDriverDto,
    @GetUser('sub') userId: string,
  ) {
    const result = await this.teamDriverService.create(dto, userId);
    return new DataResponse(result);
  }

  @Version('1')
  @Get()
  @CheckActionPolicy(PermissionEnum.READ, resource.TeamDriver)
  async findAll(
    @Query() query: CommonFieldsDto,
    @GetUser('sub') userId: string,
  ) {
    const result = await this.teamDriverService.findAll(userId, query);
    return new PaginatedDataResponse(result.data, result.meta);
  }

  @Version('1')
  @Get(':id')
  @CheckActionPolicy(PermissionEnum.READ, resource.TeamDriver)
  async findOne(@Param('id') id: string, @GetUser('sub') userId: string) {
    const result = await this.teamDriverService.findOne(id, userId);
    return new DataResponse(result);
  }

  @Version('1')
  @Put(':id')
  @CheckActionPolicy(PermissionEnum.UPDATE, resource.TeamDriver)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTeamDriverDto,
    @GetUser('sub') userId: string,
  ) {
    const result = await this.teamDriverService.update(id, dto, userId);
    return new DataResponse(result);
  }

  @Version('1')
  @Delete(':id')
  @CheckActionPolicy(PermissionEnum.DELETE, resource.TeamDriver)
  async remove(@Param('id') id: string, @GetUser('sub') userId: string) {
    const result = await this.teamDriverService.remove(id, userId);
    return new DataResponse(result, 'Team driver removed successfully');
  }
}
