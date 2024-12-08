import {
  IsString,
  IsOptional,
  IsEmail,
  IsBoolean,
  IsEnum,
} from 'class-validator';

export class UpdateGuardianDto {
  @IsString({ message: 'El DNI debe ser un texto.' })
  @IsOptional()
  dni?: string;

  @IsString({ message: 'El nombre debe ser un texto.' })
  @IsOptional()
  name?: string;

  @IsString({ message: 'El apellido debe ser un texto.' })
  @IsOptional()
  last_name?: string;

  @IsEmail(
    {},
    { message: 'El correo debe ser una dirección de correo válida.' },
  )
  @IsOptional()
  email?: string;

  @IsString({ message: 'El número de teléfono debe ser un texto.' })
  @IsOptional()
  phoneNumber?: string;

  @IsString({ message: 'La dirección debe ser un texto.' })
  @IsOptional()
  address?: string;

  @IsString({ message: 'La ocupación debe ser un texto.' })
  @IsOptional()
  occupation?: string;

  @IsBoolean({ message: 'El estado activo debe ser un valor booleano.' })
  @IsOptional()
  isActive?: boolean;

  @IsEnum(['male', 'female', 'other'], {
    message: 'El género debe ser "male", "female" o "other".',
  })
  @IsOptional()
  gender?: 'male' | 'female' | 'other';
}
