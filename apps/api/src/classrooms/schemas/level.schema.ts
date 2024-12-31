import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Grade } from './grade.schema';

@Schema({ timestamps: true })
export class Level extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grade' }] })
  grades: Grade[];
}

export const LevelSchema = SchemaFactory.createForClass(Level);
