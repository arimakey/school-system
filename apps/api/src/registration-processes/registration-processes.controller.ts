import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegistrationProcessesService } from './registration-processes.service';
import { CreateRegistrationProcessDto } from './dto/create-registration-process.dto';
import { UpdateRegistrationProcessDto } from './dto/update-registration-process.dto';

@Controller('registration-processes')
export class RegistrationProcessesController {
  constructor(private readonly registrationProcessesService: RegistrationProcessesService) {}

  @Post()
  create(@Body() createRegistrationProcessDto: CreateRegistrationProcessDto) {
    return this.registrationProcessesService.create(createRegistrationProcessDto);
  }

  @Get()
  findAll() {
    return this.registrationProcessesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrationProcessesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegistrationProcessDto: UpdateRegistrationProcessDto) {
    return this.registrationProcessesService.update(id, updateRegistrationProcessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrationProcessesService.remove(id);
  }

  @Patch(':id/toggle-active')
  toggleActive(@Param('id') id: string) {
    return this.registrationProcessesService.toggleActive(id);
  }

  @Get('active')
  findAllActive() {
    return this.registrationProcessesService.findAllActive();
  }
}
