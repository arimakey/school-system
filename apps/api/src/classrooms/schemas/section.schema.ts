import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Section extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Grade' })
  gradeId: string;

  @Prop({ type: Number, required: true })
  capacity: number;
}

export const SectionSchema = SchemaFactory.createForClass(Section);
