import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { RegistersModule } from './registers/registers.module';
import { GuardiansModule } from './guardians/guardians.module';
import { RegistrationProcessesModule } from './registration-processes/registration-processes.module';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/database'),
    AuthModule,
    StudentsModule,
    ClassroomsModule,
    RegistersModule,
    GuardiansModule,
    RegistrationProcessesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UploadModule,
  ],
})
export class AppModule {}
