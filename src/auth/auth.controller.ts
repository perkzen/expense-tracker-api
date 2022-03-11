import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiPreconditionFailedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { ILoginResponse } from '../types/interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({ description: 'New user created' })
  @ApiPreconditionFailedResponse({
    description: 'User with this username already exists',
  })
  @Post('/register')
  async registerUser(@Body() user: AuthDto): Promise<User> {
    return await this.authService.register(user);
  }

  @ApiOkResponse({ description: 'Login successful.' })
  @Post('/login')
  async loginUser(@Body() user: AuthDto): Promise<ILoginResponse> {
    return await this.authService.login(user);
  }
}
