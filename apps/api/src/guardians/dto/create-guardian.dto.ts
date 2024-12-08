import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsBoolean,
  IsEnum,
} from 'class-validator';

export class CreateGuardianDto {
  @IsString({ message: 'El DNI debe ser un texto.' })
  @IsNotEmpty({ message: 'El DNI es obligatorio.' })
  dni: string;

  @IsString({ message: 'El nombre debe ser un texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  name: string;

  @IsString({ message: 'El apellido debe ser un texto.' })
  @IsNotEmpty({ message: 'El apellido es obligatorio.' })
  last_name: string;

  @IsEmail({}, { message: 'El correo debe ser una dirección de correo válida.' })
  @IsNotEmpty({ message: 'El correo es obligatorio.' })
  email: string;

  @IsString({ message: 'El número de teléfono debe ser un texto.' })
  @IsNotEmpty({ message: 'El número de teléfono es obligatorio.' })
  phoneNumber: string;

  @IsString({ message: 'La dirección debe ser un texto.' })
  @IsOptional()
  address?: string;

  @IsString({ message: 'La ocupación debe ser un texto.' })
  @IsOptional()
  occupation?: string;

  @IsBoolean({ message: 'El estado activo debe ser un valor booleano.' })
  @IsOptional()
  isActive?: boolean;

  @IsEnum(['male', 'female', 'other'], { message: 'El género debe ser "male", "female" o "other".' })
  @IsOptional()
  gender?: 'male' | 'female' | 'other';
}
