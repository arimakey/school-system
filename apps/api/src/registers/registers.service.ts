import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Register } from './schemas/register.schema';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { CreateRegisterDto } from './dto/create-register.dto';
import { Section } from 'src/classrooms/schemas/section.schema';
import { ClassroomsService } from 'src/classrooms/classrooms.service';

@Injectable()
export class RegistersService {
  constructor(
    @InjectModel(Register.name) private readonly registerModel: Model<Register>,
    private readonly classroomService: ClassroomsService,
  ) {}

  async create(createRegisterDto: CreateRegisterDto): Promise<Register> {
    const newRegister = await this.registerModel.create(createRegisterDto);

    return await this.registerModel
      .findById(newRegister._id)
      .populate('student')
      .populate('guardian')
      .populate('classroom')
      .populate('registrationProcess')
      .exec();
  }

  async findAll(): Promise<Register[]> {
    return this.registerModel
      .find()
      .populate('student')
      .populate('guardian')
      .populate('classroom')
      .populate('registrationProcess')
      .exec();
  }

  async findAllAprobated(): Promise<Register[]> {
    return this.registerModel
      .find({ isAprobated: true })
      .populate('student')
      .populate('guardian')
      .populate('classroom')
      .populate('registrationProcess')
      .exec();
  }


  async findOne(id: string): Promise<Register> {
    const register = await this.registerModel
      .findById(id)
      .populate('student')
      .populate('guardian')
      .populate('classroom')
      .exec();
    if (!register) {
      throw new NotFoundException(`Register with ID ${id} not found`);
    }
    return register;
  }

  async update(
    id: string,
    updateRegisterDto: UpdateRegisterDto,
  ): Promise<Register> {
    const updatedRegister = await this.registerModel
      .findByIdAndUpdate(id, updateRegisterDto, { new: true })
      .exec();
    if (!updatedRegister) {
      throw new NotFoundException(`Register with ID ${id} not found`);
    }
    return updatedRegister;
  }

  async remove(id: string): Promise<void> {
    const deletedRegister = await this.registerModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedRegister) {
      throw new NotFoundException(`Register with ID ${id} not found`);
    }
  }

  async getSectionsByGradeWithCapacity(
    gradeId: string,
    processId: string,
  ): Promise<Section[]> {
    const sections = await this.classroomService.findSectionsByGrade(gradeId);

    if (!sections || sections.length === 0) {
      console.log(
        `No se encontraron secciones para el grado con ID: ${gradeId}`,
      );
      return [];
    }

    const registers = await this.registerModel
      .find({ registrationProcess: processId, isAprobated: true })
      .exec();

    const registerCountBySection: Record<string, number> = registers.reduce(
      (acc, register) => {
        const sectionId = register.classroom.toString();
        acc[sectionId] = (acc[sectionId] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const sectionsWithAdjustedCapacity = sections.map((section) => {
      const registeredCount =
        registerCountBySection[section._id.toString()] || 0;
      return {
        ...section.toObject(),
        capacity: section.capacity - registeredCount,
      };
    });

    return sectionsWithAdjustedCapacity as Section[];
  }

  getNotAprobatedRegisters(): Promise<Register[]> {
    return this.registerModel
      .find({ isAprobated: false })
      .populate('student')
      .populate('guardian')
      .populate('classroom')
      .populate('registrationProcess')
      .exec();
  }

  aprobateRegister(id: string): Promise<Register> {
    return this.registerModel.findByIdAndUpdate(
      id,
      { isAprobated: true },
      { new: true },
    );
  }

  async findRegistersByGuardianEmail(email: string): Promise<Register[]> {
    return this.registerModel
      .find({ 'guardian.email': email })
      .populate('student')
      .populate('guardian')
      .populate('classroom')
      .populate('registrationProcess')
      .exec();
  }
}
