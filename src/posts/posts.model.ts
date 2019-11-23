import { UserRO } from '../user/user.model';

export interface PostDTO {
    title: string;
    details: string;
}

export interface PostRO {
    id: string;
    created: Date;
    title: string;
    details: string;
    author: UserRO;
}
