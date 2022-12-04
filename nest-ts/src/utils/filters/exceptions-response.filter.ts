import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
 
//  catch this exception only
// @Catch(NotFoundException)
//  catch all exceptions
@Catch()
// this class ExceptionFilter has more powerful than BaseExceptionFilter
export class ExceptionsResponseFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;
 
    response
      .status(status)
      .json({
        message,
        statusCode: status,
        time: new Date().toISOString(),
      });
  }
}