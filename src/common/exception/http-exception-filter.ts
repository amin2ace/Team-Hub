// --- Global Exception Filter for Consistent Error Responses ---

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Log the error with Pino
    // this.logger.error({
    //   statusCode: status,
    //   path: request.url,
    //   method: request.method,
    //   message:
    //     typeof exceptionResponse === 'string'
    //       ? exceptionResponse
    //       : (exceptionResponse as any).message,
    //   stack: exception.stack,
    // });

    response.status(status).json({
      statusCode: status,
      message:
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
