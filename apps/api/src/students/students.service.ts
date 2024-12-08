import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './schemas/student.schemas';
import { Model } from 'mongoose';

@Injectable()
export class StudentsService {
  constructor(@InjectModel(Student.name) private studentModel : Model<Student>) {}

  create(createStudentDto: CreateStudentDto) {
    return new this.studentModel(createStudentDto).save();
  }

  findAll() {
    return this.studentModel.find();
  }

  findOne(id: string) {
    return this.studentModel.findById(id);
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    return this.studentModel.findByIdAndUpdate(id, updateStudentDto);
  }

  remove(id: string) {
    return this.studentModel.findByIdAndDelete(id);
  }
  
  findOneDni(dni: string) {
    return this.studentModel.find({ dni });
  }
}
