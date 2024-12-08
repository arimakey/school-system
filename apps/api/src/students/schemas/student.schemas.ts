import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true
})
export class Student {
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
    default: true
  })
  isActive: boolean;

  @Prop({
    required: false,
    enum: ['male', 'female', 'other'],
  })
  gender: 'male' | 'female' | 'other';
}

export const StudentSchema = SchemaFactory.createForClass(Student);
