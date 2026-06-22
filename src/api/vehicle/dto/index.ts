import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  vehicleNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  carName: string;

  @ApiProperty()
  @IsNumber()
  registrationYear: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  manufacturerName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  assignedTeamDriverId?: string;
}

export class UpdateVehicleDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  carName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  registrationYear?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  manufacturerName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  assignedTeamDriverId?: string;
}

export class AssignTeamDriverDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  assignedTeamDriverId: string;
}
