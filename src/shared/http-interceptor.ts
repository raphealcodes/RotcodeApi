import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger} from '@nestjs/common';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class HttpInjector implements NestInterceptor {
intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
   const request = context.switchToHttp().getRequest();
   const url = request.url;
   const time =  Date.now();
   const method = request.method;

   return next.handle().pipe(
     tap(() => Logger.log(`${url}, ${method}, ${Date.now() - time}ms`, context.getClass().name)),
   );
}
}
