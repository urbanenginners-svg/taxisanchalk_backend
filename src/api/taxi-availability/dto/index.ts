import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaxiAvailabilityDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  vehicleId?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fromLocation: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  toLocation?: string;

  @ApiProperty()
  @IsDateString()
  availableFrom: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  availableUntil?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateTaxiEnquiryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class RespondTaxiEnquiryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  response: string;
}
