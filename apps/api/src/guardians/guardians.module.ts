import { Module } from '@nestjs/common';
import { GuardiansService } from './guardians.service';
import { GuardiansController } from './guardians.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Guardian, GuardianSchema } from './schemas/guardian.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Guardian.name, schema: GuardianSchema }]),
  ],
  controllers: [GuardiansController],
  providers: [GuardiansService],
})
export class GuardiansModule {}
