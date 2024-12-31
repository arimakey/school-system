import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import * as bcrypt from 'bcrypt';
import { VerifyLoginDto } from './dto/verify-login.dto';
import { JwtService } from '@nestjs/jwt';
import * as generatePassword from 'generate-password';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly transporter: nodemailer.Transporter;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService, // Inyectamos ConfigService
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });
  }

  updateProfile(userId: string, body: any) {
    return this.usersService.update(userId, body);
  }

  async login(user: VerifyLoginDto) {
    const userData = await this.usersService.findOneByEmail(user.email);

    if (!userData) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(user.password, userData.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { sub: userData._id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: userData,
    };
  }

  async register(createRegister: CreateRegisterDto) {
    try {
      const existingUser = await this.usersService.findOneByEmail(createRegister.email);
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      const password = generatePassword.generate({
        length: 12,
        numbers: true,
        symbols: true,
        uppercase: true,
        lowercase: true,
        excludeSimilarCharacters: true,
      });

      const hashedPassword = await bcrypt.hash(password, 10);

      const mailOptions = {
        from: this.configService.get<string>('MAIL_FROM'),
        to: createRegister.email,
        subject: '🎉 ¡Bienvenido/a a Nuestro Sistema! 🎉',
        html: `
          <div>
            <h2>¡Bienvenido/a, ${createRegister.username}!</h2>
            <p>A continuación, encontrarás los datos necesarios para iniciar sesión:</p>
            <p><strong>Correo electrónico:</strong> ${createRegister.email}</p>
            <p><strong>Contraseña:</strong> ${password}</p>
          </div>
        `,
      };

      await this.transporter.sendMail(mailOptions);

      const user = await this.usersService.create({
        ...createRegister,
        password: hashedPassword,
      });

      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async recoverPassword(email: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newPassword = generatePassword.generate({
      length: 12,
      numbers: true,
      symbols: true,
      uppercase: true,
      lowercase: true,
      excludeSimilarCharacters: true,
    });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const mailOptions = {
      from: this.configService.get<string>('MAIL_FROM'),
      to: email,
      subject: '🔒 Recuperación de Contraseña',
      html: `
        <div>
          <h2>Recuperación de Contraseña</h2>
          <p>Tu nueva contraseña es: ${newPassword}</p>
        </div>
      `,
    };

    await this.transporter.sendMail(mailOptions);
    await this.usersService.updatePassword(user._id.toString(), hashedPassword);

    return { message: 'Correo de recuperación enviado' };
  }


}
