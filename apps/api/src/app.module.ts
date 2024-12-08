import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { RegistersModule } from './registers/registers.module';
import { GuardiansModule } from './guardians/guardians.module';


@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
    AuthModule,
    StudentsModule,
    ClassroomsModule,
    RegistersModule,
    GuardiansModule,
  ],
})
export class AppModule {}
