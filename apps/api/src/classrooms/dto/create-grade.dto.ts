import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class CreateGradeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsMongoId()
  @IsNotEmpty()
  levelId: string;
}
