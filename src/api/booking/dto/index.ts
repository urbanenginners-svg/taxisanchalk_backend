import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class BookingCustomerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateBookingDto {
  @ApiProperty({ example: 'Delhi' })
  @IsString()
  @IsNotEmpty()
  fromLocation: string;

  @ApiProperty({ example: 'Chandigarh' })
  @IsString()
  @IsNotEmpty()
  toLocation: string;

  @ApiProperty({ example: 10000 })
  @IsNumber()
  @Min(0)
  actualPrice: number;

  @ApiProperty({ example: 1000 })
  @IsNumber()
  @Min(0)
  commission: number;

  @ApiProperty({ type: BookingCustomerDto })
  @ValidateNested()
  @Type(() => BookingCustomerDto)
  customer: BookingCustomerDto;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  travelDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateBookingRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class PayCommissionDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  transactionReference?: string;
}
