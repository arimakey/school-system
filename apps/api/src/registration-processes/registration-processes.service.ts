import { Injectable } from '@nestjs/common';
import { CreateRegistrationProcessDto } from './dto/create-registration-process.dto';
import { UpdateRegistrationProcessDto } from './dto/update-registration-process.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RegistrationProcess } from './schemas/registration-process.schemas';
import { Model } from 'mongoose';

@Injectable()
export class RegistrationProcessesService {
  constructor(
    @InjectModel(RegistrationProcess.name)
    private registrationProcessesModel: Model<RegistrationProcess>,
  ) {}

  create(createRegistrationProcessDto: CreateRegistrationProcessDto) {
    return new this.registrationProcessesModel(
      createRegistrationProcessDto,
    ).save();
  }

  findAll() {
    return this.registrationProcessesModel.find();
  }

  findOne(id: string) {
    return this.registrationProcessesModel.findById(id);
  }

  update(id: string, updateRegistrationProcessDto: UpdateRegistrationProcessDto) {
    return this.registrationProcessesModel.findByIdAndUpdate(id, updateRegistrationProcessDto, { new: true });
  }  

  remove(id: string) {
    return this.registrationProcessesModel.findByIdAndDelete(id);
  }


  async toggleActive(id: string) {
    const document = await this.registrationProcessesModel.findById(id);
    if (!document) {
      throw new Error('Document not found');
    }
    const updatedDocument = await this.registrationProcessesModel.findByIdAndUpdate(
      id,
      { $set: { status: !document.status } },
      { new: true }
    );
    return updatedDocument;
  }
  

  findAllActive() {
    return this.registrationProcessesModel.find({ active: true });
  }

  // async countAvailableSeats(classroomId: string, registrationProcessId: string): Promise<number> {
  //   const section = await this.sectionModel.findById(classroomId);
  //   if (!section) {
  //     throw new NotFoundException('Sección no encontrada');
  //   }

  //   const currentRegistrations = await this.registerModel.countDocuments({
  //     classroom: classroomId,
  //     registrationProcess: registrationProcessId,
  //   });

  //   const availableSeats = section.capacity - currentRegistrations;

  //   return availableSeats >= 0 ? availableSeats : 0;
  // }
}
