import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  bookingId?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateTicketStatusDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  adminNotes?: string;
}
