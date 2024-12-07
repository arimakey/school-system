import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    username: string;

    @IsEmail({}, { message: 'El correo electrónico no es válido.' })
    @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
    email: string;

    @IsStrongPassword(undefined, {
        message:
            'La contraseña debe incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
    })
    @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
    password: string;

    @IsOptional()
    image?: string;

    @IsOptional()
    role?: string;
}