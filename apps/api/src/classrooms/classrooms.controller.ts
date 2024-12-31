import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { CreateGradeDto } from './dto/create-grade.dto';
import { CreateSectionDto } from './dto/create-section.dto';
import { ClassroomsService } from './classrooms.service';

@Controller('classroom')
export class ClassroomsController {
  constructor(private readonly classroomService: ClassroomsService) {}

  @Post('levels')
  createLevel(@Body() dto: CreateLevelDto) {
    return this.classroomService.createLevel(dto);
  }

  @Post('grades')
  createGrade(@Body() dto: CreateGradeDto) {
    return this.classroomService.createGrade(dto);
  }

  @Post('sections')
  createSection(@Body() dto: CreateSectionDto) {
    return this.classroomService.createSection(dto);
  }

  @Get('levels')
  findAllLevels() {
    return this.classroomService.findAllLevels();
  }

  @Get('grades/:levelId')
  findGradesByLevel(@Param('levelId') levelId: string) {
    return this.classroomService.findGradesByLevel(levelId);
  }

  @Get('sections/:gradeId')
  findSectionsByGrade(@Param('gradeId') gradeId: string) {
    return this.classroomService.findSectionsByGrade(gradeId);
  }

  @Delete('sections/:id')
  removeSection(@Param('id') id: string) {
    return this.classroomService.removeSection(id);
  }
}