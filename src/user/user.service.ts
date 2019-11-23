import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserRO, UserDTO, UserRDTO } from './user.model';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRep: Repository<UserEntity>) {}

    async showAll(): Promise<UserRO[]> {
        const users = await this.userRep.find({relations: ['bookmark']});
        return users.map(user => user.responseObject(false));
    }

    async read(username: string): Promise<UserRO> {
      const user = await this.userRep.findOne({where: {username}, relations: ['bookmark']});
      if (!user) {
          throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return user.responseObject();
    }

    async login(data: UserDTO): Promise<UserRO> {
        const {username, password} = data;
        const user = await this.userRep.findOne({where: {username}});
        if (!user || !(user.ComparePassword(password))) {
            throw new HttpException('Incorrect Username/Password', HttpStatus.UNAUTHORIZED);
        }
        return user.responseObject();
    }

    async register(data: UserRDTO): Promise<UserRO> {
        const {username} = data;
        let user = await this.userRep.findOne({where: {username}});
        if (user) {
            throw new HttpException('Username Already Exists', HttpStatus.UNAUTHORIZED);
        }
        user = await this.userRep.create(data);
        await this.userRep.save(user);
        return user.responseObject();
    }

    async delete(id: string): Promise<UserRO> {
        const user = await this.userRep.findOne({where: {id}});
        await this.userRep.delete({id});
        return user.responseObject();
    }
}
