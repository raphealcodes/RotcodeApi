import { Catch, ExceptionFilter, HttpException, ArgumentsHost, Logger, HttpStatus } from '@nestjs/common';

@Catch()
export class HttpFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const cxt = host.switchToHttp();
        const request = cxt.getRequest();
        const response = cxt.getResponse();
        const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const errorMessage = {
            path: request.url,
            method: request.method,
            timestamp: new Date().toLocaleTimeString(),
            message: status !== HttpStatus.INTERNAL_SERVER_ERROR
            ? exception.message.error || exception.message || null
            : 'Internal server error',
    };

        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
    Logger.error(
        `${request.method} ${request.url}`,
        exception.stack,
        'ExceptionFilter',
    );
} else {
    Logger.error(
        `${request.method} ${request.url}`,
        JSON.stringify(errorMessage),
        'ExceptionFilter',
    );
}
        response.status(400).json(errorMessage);
    }
}
