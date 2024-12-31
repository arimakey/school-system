import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsBoolean, IsDate, IsNotEmpty } from 'class-validator';

export class CreateRegistrationProcessDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;

    @IsNotEmpty()
    @Transform( ({ value }) => new Date(value))
    @IsDate()
    startDate: Date;

    @IsNotEmpty()
    @Transform( ({ value }) => new Date(value))
    @IsDate()
    endDate: Date;
}
