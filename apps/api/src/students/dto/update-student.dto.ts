import { IsString, IsOptional, IsDate, IsBoolean, IsEmail, IsEnum } from 'class-validator';

export class UpdateStudentDto {
  @IsString({ message: 'El código debe ser un texto.' })
  @IsOptional()
  code?: string;

  @IsString({ message: 'El nombre debe ser un texto.' })
  @IsOptional()
  name?: string;

  @IsString({ message: 'El apellido debe ser un texto.' })
  @IsOptional()
  last_name?: string;

  @IsString({ message: 'El DNI debe ser un texto.' })
  @IsOptional()
  dni?: string;

  @IsEmail({}, { message: 'El correo debe ser una dirección de correo válida.' })
  @IsOptional()
  email?: string;

  @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida.' })
  @IsOptional()
  birthdate?: Date;

  @IsString({ message: 'La dirección debe ser un texto.' })
  @IsOptional()
  address?: string;

  @IsString({ message: 'El número de teléfono debe ser un texto.' })
  @IsOptional()
  phoneNumber?: string;

  @IsDate({ message: 'La fecha de matrícula debe ser una fecha válida.' })
  @IsOptional()
  enrollmentDate?: Date;

  @IsBoolean({ message: 'El estado activo debe ser un valor booleano.' })
  @IsOptional()
  isActive?: boolean;

  @IsEnum(['male', 'female', 'other'], { message: 'El género debe ser "male", "female" o "other".' })
  @IsOptional()
  gender?: 'male' | 'female' | 'other';
}
