import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class VerifyLoginDto {

    @IsEmail({}, { message: 'El correo electrónico no es válido.' })
    @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
    email: string;

    @IsStrongPassword(undefined, {
        message:
            'La contraseña debe incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
    })
    @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
    password: string;
}