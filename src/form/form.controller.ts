import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { FormService } from './form.service';
import { FormDTO } from './form.model';

@Controller('form')
export class FormController {
    constructor(private formService: FormService) {}

    @Get()
    showAll() {
        return this.formService.showAll();
    }

    @Post()
    create(@Body() data: FormDTO) {
        return this.formService.create(data);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
  return this.formService.delete(id);
    }
}
