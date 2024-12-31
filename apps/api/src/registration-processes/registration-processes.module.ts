import { Module } from '@nestjs/common';
import { RegistrationProcessesService } from './registration-processes.service';
import { RegistrationProcessesController } from './registration-processes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrationProcessSchema } from './schemas/registration-process.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RegistrationProcess', schema: RegistrationProcessSchema },
    ]),
  ],
  controllers: [RegistrationProcessesController],
  providers: [RegistrationProcessesService],
})
export class RegistrationProcessesModule {}
