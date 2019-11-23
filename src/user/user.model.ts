export interface UserDTO {
    username: string;
    password: string;
}

export interface UserRO {
    id: string;
    created: Date;
    token?: string;
    username: string;
    dateofbirth: string;
    stack: string;
    company: string;
    country: string;
    name: string;
    city: string;
}

export interface UserRDTO {
    username: string;
    password: string;
    dateofbirth: string;
    stack: string;
    company: string;
    country: string;
    fullname: string;
    city: string;
}
