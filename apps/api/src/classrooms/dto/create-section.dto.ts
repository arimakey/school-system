import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class CreateSectionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsMongoId()
  @IsNotEmpty()
  gradeId: string;

  @IsNotEmpty()
  capacity: number;
}
