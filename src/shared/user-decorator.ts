import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, request) => data ? request.user[data] : request.user);
