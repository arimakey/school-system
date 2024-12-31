import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Section } from 'src/classrooms/schemas/section.schema';
import { Guardian } from 'src/guardians/schemas/guardian.schema';
import { RegistrationProcess } from 'src/registration-processes/schemas/registration-process.schemas';
import { Student } from 'src/students/schemas/student.schemas';

@Schema({
  timestamps: true,
})
export class Register {
  @Prop({
    type: Types.ObjectId,
    ref: 'Student',
    required: true,
  })
  student: Student;
  
  @Prop({
    type: Types.ObjectId,
    ref: 'Guardian',
    required: true,
  })
  guardian: Guardian;

  @Prop({
    type: Types.ObjectId,
    ref: 'Section',
    required: true,
  })
  classroom: Section;

  @Prop({
    type: Types.ObjectId,
    ref: 'RegistrationProcess',
  })
  registrationProcess : RegistrationProcess;

  @Prop({
    required: true,
    default: true
  })
  isAprobated: boolean;
}

export const RegisterSchema = SchemaFactory.createForClass(Register);
