import { Type } from 'class-transformer';
import { 
  IsString, 
  IsNotEmpty, 
  IsOptional, 
  IsDate, 
  IsBoolean, 
  IsEmail, 
  IsEnum 
} from 'class-validator';

export class CreateStudentDto {
  @IsString({ message: 'El código debe ser un texto.' })
  @IsNotEmpty({ message: 'El código es obligatorio.' })
  code: string;

  @IsString({ message: 'El nombre debe ser un texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  name: string;

  @IsString({ message: 'El apellido debe ser un texto.' })
  @IsNotEmpty({ message: 'El apellido es obligatorio.' })
  last_name: string;

  @IsString({ message: 'El DNI debe ser un texto.' })
  @IsNotEmpty({ message: 'El DNI es obligatorio.' })
  dni: string;

  @IsEmail({}, { message: 'El correo debe ser una dirección de correo válida.' })
  @IsNotEmpty({ message: 'El correo es obligatorio.' })
  email: string;

  @Type(() => Date)
  @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida.' })
  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria.' })
  birthdate: Date;

  @IsString({ message: 'La dirección debe ser un texto.' })
  @IsOptional()
  address?: string;

  @IsString({ message: 'El número de teléfono debe ser un texto.' })
  @IsOptional()
  phoneNumber?: string;

  @Type(() => Date)
  @IsDate({ message: 'La fecha de matrícula debe ser una fecha válida.' })
  @IsNotEmpty({ message: 'La fecha de matrícula es obligatoria.' })
  enrollmentDate: Date;

  @IsBoolean({ message: 'El estado activo debe ser un valor booleano.' })
  @IsOptional()
  isActive: boolean;

  @IsEnum(['male', 'female', 'other'], { message: 'El género debe ser "male", "female" o "other".' })
  @IsOptional()
  gender?: 'male' | 'female' | 'other';
}
