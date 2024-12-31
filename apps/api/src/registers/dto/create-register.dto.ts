import { IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';

export class CreateRegisterDto {
  @IsNotEmpty()
  @IsMongoId()
  student: string;

  @IsNotEmpty()
  @IsMongoId()
  guardian: string;

  @IsNotEmpty()
  @IsMongoId()
  classroom: string;
  
  @IsNotEmpty()
  @IsMongoId()
  registrationProcess: string;

  @IsOptional()
  isAprobated: boolean;
}
