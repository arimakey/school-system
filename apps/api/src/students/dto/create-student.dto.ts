import { IsString, IsNotEmpty, IsOptional, IsDate, IsBoolean, IsEmail, IsEnum } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDate()
  @IsNotEmpty()
  birthdate: Date;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsDate()
  @IsNotEmpty()
  enrollmentDate: Date;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @IsString()
  @IsOptional()
  nationality?: string;

  @IsEnum(['male', 'female', 'other'])
  @IsOptional()
  gender?: 'male' | 'female' | 'other';
}