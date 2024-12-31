import { Injectable } from '@nestjs/common';
import { CreateGuardianDto } from './dto/create-guardian.dto';
import { UpdateGuardianDto } from './dto/update-guardian.dto';
import { Guardian } from './schemas/guardian.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GuardiansService {
  constructor(@InjectModel(Guardian.name) private guardianModel : Model<Guardian>) {}

  create(createGuardianDto: CreateGuardianDto) {
    return new this.guardianModel(createGuardianDto).save();
  }

  findAll() {
    return this.guardianModel.find();
  }

  findOne(id: string) {
    return this.guardianModel.findById(id);
  }

  update(id: string, updateGuardianDto: UpdateGuardianDto) {
    return this.guardianModel.findByIdAndUpdate(id, updateGuardianDto);
  }

  remove(id: string) {
    return this.guardianModel.findByIdAndDelete(id);
  }

  findOneDni(dni: string) {
    return this.guardianModel.findOne({dni});
  }
}
