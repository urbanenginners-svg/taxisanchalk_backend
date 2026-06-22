import { Body, Controller, Get, Post, Version } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { DataResponse } from 'src/utils/response';
import { DriverRegisterDto, LoginDto } from './dto';
import { LoginSwagger, GetMeSwagger } from './auth.swagger';
import { Public } from 'src/utils/decorators/public-key.decorator';
import { GetUser } from 'src/utils/decorators/get-user.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Version('1')
  @Post('driver/register')
  @ApiOperation({ summary: 'Register a new driver' })
  @ApiResponse({ status: 201, description: 'Driver registered successfully' })
  async registerDriver(@Body() dto: DriverRegisterDto) {
    const result = await this.authService.registerDriver(dto);
    return new DataResponse(result);
  }

  @Public()
  @Version('1')
  @Post('driver/login')
  @LoginSwagger()
  async driverLogin(@Body() loginDto: LoginDto) {
    const result = await this.authService.driverLogin(loginDto);
    return new DataResponse(result);
  }

  @Public()
  @Version('1')
  @Post('admin/login')
  @ApiOperation({ summary: 'Admin login with email and password' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  async adminLogin(@Body() loginDto: LoginDto) {
    const result = await this.authService.adminLogin(loginDto);
    return new DataResponse(result);
  }

  @Version('1')
  @Get('me')
  @GetMeSwagger()
  async getMe(@GetUser('_id') userId: string) {
    const user = await this.authService.getPopulatedUser(userId);
    return new DataResponse(user);
  }
}
