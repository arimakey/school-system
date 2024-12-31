import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { VerifyLoginDto } from './dto/verify-login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { RecoverPasswordDto } from './dto/recover-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() user: VerifyLoginDto) {
    return this.authService.login(user);
  }

  @Post('register')
  register(@Body() user: CreateRegisterDto) {
    return this.authService.register(user);
  }

  @Post('recovery')
  recovery(@Body() user: RecoverPasswordDto) {
    return this.authService.recoverPassword(user.email);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @Patch('profile')
  updateProfile(@Request() req, @Body() body) {
    const userId = req.user.sub;
    console.log(userId);
    return this.authService.updateProfile(userId, body);
  }
}
