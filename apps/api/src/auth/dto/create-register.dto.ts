import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, IsUrl } from "class-validator";

export class CreateRegisterDto {
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    username: string;

    @IsEmail({}, { message: 'El correo electrónico no es válido.' })
    @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
    email: string;

    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    role: string;
}