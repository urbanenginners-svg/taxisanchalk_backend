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

import { TicketService } from './ticket.service';
import { CreateTicketDto, UpdateTicketStatusDto } from './dto';
import { DataResponse, PaginatedDataResponse } from 'src/utils/response';
import { PoliciesGuard } from 'src/services/casl/casl-policies.guard';
import { CheckActionPolicy } from 'src/services/casl/casl-policies.decorator';
import { PermissionEnum } from 'src/utils/enums/permission.enum';
import { resource } from 'src/utils/constants/resource';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { CommonFieldsDto } from 'src/utils/dtos/common-fields.dto';

@ApiTags('Tickets')
@Controller('tickets')
@UseGuards(PoliciesGuard)
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Version('1')
  @Post()
  @CheckActionPolicy(PermissionEnum.WRITE, resource.Ticket)
  async create(@Body() dto: CreateTicketDto, @GetUser('sub') userId: string) {
    const result = await this.ticketService.create(dto, userId);
    return new DataResponse(result);
  }

  @Version('1')
  @Get('my')
  @CheckActionPolicy(PermissionEnum.READ, resource.Ticket)
  async findMy(@Query() query: CommonFieldsDto, @GetUser('sub') userId: string) {
    const result = await this.ticketService.findMyTickets(userId, query);
    return new PaginatedDataResponse(result.data, result.meta);
  }

  @Version('1')
  @Get()
  @CheckActionPolicy(PermissionEnum.READ, resource.Ticket)
  async findAll(@Query() query: CommonFieldsDto) {
    const result = await this.ticketService.findAll(query);
    return new PaginatedDataResponse(result.data, result.meta);
  }

  @Version('1')
  @Get(':id')
  @CheckActionPolicy(PermissionEnum.READ, resource.Ticket)
  async findOne(@Param('id') id: string) {
    const result = await this.ticketService.findOne(id);
    return new DataResponse(result);
  }

  @Version('1')
  @Patch(':id/status')
  @CheckActionPolicy(PermissionEnum.UPDATE, resource.Ticket)
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateTicketStatusDto,
    @GetUser('sub') userId: string,
  ) {
    const result = await this.ticketService.updateStatus(id, dto, userId);
    return new DataResponse(result);
  }
}
