import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsBoolean, IsDate } from 'class-validator';

export class UpdateRegistrationProcessDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    status?: boolean;

    @IsOptional()
    @Transform( ({ value }) => new Date(value))
    @IsDate()
    startDate?: Date;

    @IsOptional()
    @Transform( ({ value }) => new Date(value))
    @IsDate()
    endDate?: Date;
}
