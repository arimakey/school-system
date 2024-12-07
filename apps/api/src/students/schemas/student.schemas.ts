// src/students/schemas/student.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true
})
export class Student extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  code: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  last_name: string;

  @Prop({
    required: true,
    unique: true,
  })
  dni: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  birthdate: Date;

  @Prop({
    required: false,
  })
  address: string;

  @Prop({
    required: false,
  })
  phoneNumber: string;

  @Prop({
    required: true,
  })
  enrollmentDate: Date;

  @Prop({
    required: true,
  })
  isActive: boolean;

  @Prop({
    required: false,
  })
  nationality: string;

  @Prop({
    required: false,
    enum: ['male', 'female', 'other'],
  })
  gender: 'male' | 'female' | 'other';
}

export const StudentSchema = SchemaFactory.createForClass(Student);
