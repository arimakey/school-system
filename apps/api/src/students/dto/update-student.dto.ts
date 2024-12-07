import { IsString, IsOptional, IsDate, IsBoolean, IsEmail, IsEnum } from 'class-validator';

export class UpdateStudentDto {
  @IsString()
  @IsOptional()
  code?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsString()
  @IsOptional()
  dni?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsDate()
  @IsOptional()
  birthdate?: Date;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsDate()
  @IsOptional()
  enrollmentDate?: Date;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  nationality?: string;

  @IsEnum(['male', 'female', 'other'])
  @IsOptional()
  gender?: 'male' | 'female' | 'other';
}
