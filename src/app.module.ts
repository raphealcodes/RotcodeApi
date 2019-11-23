import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormModule } from './form/form.module';
import { TypeOrmModule} from '@nestjs/typeorm';
import { HttpFilter } from './shared/http-filter';
import {APP_FILTER, APP_INTERCEPTOR} from '@nestjs/core';
import { HttpInjector } from './shared/http-interceptor';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [FormModule, TypeOrmModule.forRoot(), UserModule, PostsModule],
  controllers: [AppController],
  providers: [AppService, {provide: APP_FILTER, useClass: HttpFilter}, {provide: APP_INTERCEPTOR, useClass: HttpInjector}],
})
export class AppModule {}
