import { Controller, Get, Post, Body, Param, UseGuards, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO, UserRDTO } from './user.model';
import { AuthGuard } from '../shared/authguard';
import { User } from '../shared/user-decorator';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('users')
    showAll() {
        return this.userService.showAll();
    }

    @Get(':username')
    read(@Param('username') username: string) {
        return this.userService.read(username);
    }

    @Get('auth/whoami')
    @UseGuards(new AuthGuard())
    showMe(@User('username') username: string) {
return this.userService.read(username);
    }

    @Post('login')
    login(@Body() data: UserDTO) {
        return this.userService.login(data);
    }

    @Post('register')
    register(@Body() data: UserRDTO) {
        return this.userService.register(data);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.userService.delete(id);
    }

}
