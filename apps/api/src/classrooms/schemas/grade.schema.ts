import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Section } from './section.schema';

@Schema({ timestamps: true })
export class Grade extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Level' })
  levelId: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }] })
  sections: Section[];
}

export const GradeSchema = SchemaFactory.createForClass(Grade);
