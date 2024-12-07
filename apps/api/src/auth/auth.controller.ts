import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { VerifyLoginDto } from './dto/verify-login.dot';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @Post('login')
    login(@Body() user : VerifyLoginDto) {
        return this.authService.login(user);
    }

    @Post('register')
    register(@Body() user: CreateRegisterDto) {
        return this.authService.register(user);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
