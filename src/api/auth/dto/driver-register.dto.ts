import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class DriverRegisterDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+919876543210' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: '1990-01-15' })
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty({ example: '123 Main Street' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'Delhi' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ example: 'New Delhi' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ required: false, description: 'File ID for profile photo' })
  @IsOptional()
  @IsString()
  profilePic?: string;

  @ApiProperty({ example: 'Driver@123' })
  @IsString()
  @MinLength(8)
  password: string;
}
