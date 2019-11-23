import { Module, Controller } from '@nestjs/common';
import { FormService } from './form.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormEntity } from './form.entity';
import { FormController } from './form.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FormEntity])],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
