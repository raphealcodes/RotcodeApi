import { Controller, Get, Param, Post, Body, Delete, Put, UseGuards, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDTO } from './posts.model';
import { AuthGuard } from '../shared/authguard';
import { User } from 'src/shared/user-decorator';

@Controller('posts')
export class PostsController {
    constructor(private postservice: PostsService) {}

    @Get('posts')
    showAll(@Query('page') page: number) {
        return this.postservice.showAll(page);
    }
    @Get('newest')
    showLastest(@Query('page') page: number) {
    return this.postservice.showAll(page, true);
    }

    @Get('posts/:id')
    read(@Param('id') id: string) {
        return this.postservice.read(id);
    }
    @Post('posts')
    @UseGuards(new AuthGuard())
    create(@Body() data: PostDTO, @User('id') user) {
    return this.postservice.create(data, user);
    }

    @Put('posts/:id')
    @UseGuards(new AuthGuard())
    update(@Param('id') id: string, @Body() data: Partial<PostDTO>, @User('id') user) {
        return this.postservice.update(id, data, user);
    }

    @Delete('posts/:id')
    @UseGuards(new AuthGuard())
    delete(@Param('id') id: string, @User('id') user) {
        return this.postservice.delete(id, user);
    }

    @Post(':id/bookmarks')
    @UseGuards(new AuthGuard())
    bookmark(@Param('id') id: string, @User('id') user) {
return this.postservice.setBookmark(id, user);
    }

    @Delete(':id/bookmarks')
    @UseGuards(new AuthGuard())
    unbookmark(@Param('id') id: string, @User('id') user) {
return this.postservice.unBookmark(id, user);
    }

}
