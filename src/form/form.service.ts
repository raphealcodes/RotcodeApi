import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { FormEntity } from './form.entity';
import { FormDTO, FormRO } from './form.model';

@Injectable()
export class FormService {
    constructor(@InjectRepository(FormEntity) private formRep: Repository<FormEntity> ) {}

    async showAll(): Promise<FormRO[]> {
        const forms = await this.formRep.find({});
        if (!forms) {
            throw new HttpException('Not Found', HttpStatus.BAD_REQUEST);

        }
        return forms;
    }

    async create(data: FormDTO): Promise<FormRO> {
        const form = await this.formRep.create(data);
        await this.formRep.save(form);
        return form;
    }

    async delete(id: string): Promise<FormRO> {
        const form = await this.formRep.findOne({where: {id}});
        await this.formRep.delete({id});
        return form;
    }
}
