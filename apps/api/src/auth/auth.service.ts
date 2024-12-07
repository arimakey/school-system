import { Injectable, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import * as bcrypt from 'bcrypt';
import { VerifyLoginDto } from './dto/verify-login.dot';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (private readonly usersService : UsersService, private readonly jwtService : JwtService) {}

    async login(user : VerifyLoginDto) {
        const userData = await this.usersService.findOneByEmail(user.email);
        
        if (!userData) {
            throw new NotFoundException('User not found');
        }

        if (!await bcrypt.compare(user.password, userData.password)) {
            throw new UnauthorizedException('Invalid password');
        }

        const payload = { sub: userData._id, email: user.email };


        return {
            access_token: await this.jwtService.signAsync(payload),
            user: userData
        };
    }

    async register(createRegister : CreateRegisterDto) {
        try {
            return this.usersService.create({
                ...createRegister,
                password: await bcrypt.hash(createRegister.password, 10)
            });
        } catch (error) {
            if (error.code === 11000) {
                throw new NotFoundException('Email already exists');
            }

            throw error;
        }
    }
}
