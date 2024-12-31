import { Module } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { ClassroomsController } from './classrooms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Level, LevelSchema } from './schemas/level.schema';
import { Grade, GradeSchema } from './schemas/grade.schema';
import { Section, SectionSchema } from './schemas/section.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Level.name, schema: LevelSchema },
      { name: Grade.name, schema: GradeSchema },
      { name: Section.name, schema: SectionSchema },
    ]),
  ],
  controllers: [ClassroomsController],
  providers: [ClassroomsService],
  exports: [ClassroomsService],
})
export class ClassroomsModule {}
