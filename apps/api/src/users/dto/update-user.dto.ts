import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class UpdateUserDto {
    @IsString({ message: 'El nombre de usuario debe ser una cadena de texto.' })
    @IsOptional()
    userName?: string;

    @IsEmail({}, { message: 'El correo electrónico no es válido.' })
    @IsOptional()
    email?: string;

    @IsStrongPassword(undefined, {
        message:
            'La contraseña debe incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
    })
    @IsOptional()
    password?: string;

    @IsOptional()
    image?: string;

    @IsOptional()
    role?: string;
}