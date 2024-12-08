import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Guardian {
  @Prop({
    required: true,
    unique: true,
  })
  dni: string;

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
  email: string;

  @Prop({
    required: true,
  })
  phoneNumber: string;

  @Prop({
    required: false,
  })
  address: string;

  @Prop({
    required: false,
  })
  occupation: string;

  @Prop({
    default: true,
  })
  isActive: boolean;

  @Prop({
    required: false,
    enum: ['male', 'female', 'other'],
  })
  gender: 'male' | 'female' | 'other';
}

export const GuardianSchema = SchemaFactory.createForClass(Guardian);
