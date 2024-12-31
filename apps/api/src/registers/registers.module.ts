import { Module } from '@nestjs/common';
import { RegistersService } from './registers.service';
import { RegistersController } from './registers.controller';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Register, RegisterSchema } from './schemas/register.schema';
import { ClassroomsModule } from 'src/classrooms/classrooms.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Register.name, schema: RegisterSchema }]),
    ClassroomsModule,
  ],
  controllers: [RegistersController],
  providers: [RegistersService],
})
export class RegistersModule {}
