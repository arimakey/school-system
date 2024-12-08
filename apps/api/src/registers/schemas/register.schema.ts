import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Guardian } from 'src/guardians/schemas/guardian.schema';
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
  student: Types.ObjectId | Student;

  @Prop({
    type: Types.ObjectId,
    ref: 'Guardian',
    required: true,
  })
  guardian: Types.ObjectId | Guardian;
}

export const RegisterSchema = SchemaFactory.createForClass(Register);
