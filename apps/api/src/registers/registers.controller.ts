import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { RegistersService } from './registers.service';

@Controller('registers')
export class RegistersController {
  constructor(private readonly registerService: RegistersService) {}

  @Post()
  async create(@Body() createRegisterDto: CreateRegisterDto) {
    return this.registerService.create(createRegisterDto);
  }

  @Get('')
  async findAllAprobated() {
    return this.registerService.findAllAprobated();
  }

  
  @Get('/all')
  async findAll() {
    return this.registerService.findAll();
  }
  
  @Get('not-aprobated')
  async getNotAprobatedRegisters() {
    return this.registerService.getNotAprobatedRegisters();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.registerService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRegisterDto: UpdateRegisterDto) {
    return this.registerService.update(id, updateRegisterDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.registerService.remove(id);
  }

  @Get('sections/:id/:levelId')
  async getSectionsByLevel(@Param('levelId') levelId: string, @Param('id') id: string) {
    return this.registerService.getSectionsByGradeWithCapacity(levelId, id);
  }


  @Post('aprobate/:id')
  async aprobateRegister(@Param('id') id: string) {
    return this.registerService.aprobateRegister(id);
  }

  @Get('/guardian/:id')
  async findRegistersByGuardianEmail(@Param('id') id: string) {
    return this.registerService.findRegistersByGuardianEmail(id);
  }
}
