import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Level } from './schemas/level.schema';
import { Grade } from './schemas/grade.schema';
import { Section } from './schemas/section.schema';
import { CreateLevelDto } from './dto/create-level.dto';
import { CreateGradeDto } from './dto/create-grade.dto';
import { CreateSectionDto } from './dto/create-section.dto';

@Injectable()
export class ClassroomsService {
  constructor(
    @InjectModel(Level.name) private levelModel: Model<Level>,
    @InjectModel(Grade.name) private gradeModel: Model<Grade>,
    @InjectModel(Section.name) private sectionModel: Model<Section>,
  ) {}

  async createLevel(dto: CreateLevelDto): Promise<Level> {
    return this.levelModel.create(dto);
  }

  async createGrade(dto: CreateGradeDto): Promise<Grade> {
    return this.gradeModel.create(dto);
  }

  async createSection(dto: CreateSectionDto): Promise<Section> {
    return this.sectionModel.create(dto);
  }

  async findAllLevels(): Promise<Level[]> {
    return this.levelModel.find().populate('grades').exec();
  }

  async findGradesByLevel(id: string): Promise<Grade[]> {
    return this.gradeModel.find({ levelId: id }).populate('sections').exec();
  }

  async findSectionsByGrade(id: string): Promise<Section[]> {
    return this.sectionModel.find({ gradeId: id }).exec();
  }

  async removeSection(id: string): Promise<Section> {
    return this.sectionModel.findByIdAndDelete(id).exec();
  }
}
