import { Catch, ArgumentsHost, HttpStatus, HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Request, Response } from "express";
import { QueryFailedError } from "typeorm";
import { ValidationError } from 'class-validator'

type ErrorResponse = {
    statusCode: number,
    timeStamp: string,
    path: string,
    message: string | object,
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()

        const errResponse: ErrorResponse = {
            statusCode: 500,
            timeStamp: new Date().toISOString(),
            path: request.url,
            message: '',
        }

        if (exception instanceof HttpException) { // due to http error
            errResponse.statusCode = exception.getStatus()
            errResponse.message = exception.getResponse();
        } else if (exception instanceof QueryFailedError) { // from type orm
            errResponse.statusCode = 422
            errResponse.message = exception.message.replaceAll('\n', '')
        } else if (exception instanceof ValidationError) { // from class-validator
            errResponse.statusCode = HttpStatus.BAD_REQUEST;
            errResponse.message = exception.constraints[Object.keys(exception.constraints)[0]]
        } else if (exception instanceof TypeError) { // from type script
            errResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            errResponse.message = exception.message;
        } else { // others
            errResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            errResponse.message = 'Internal Server Error'
        }

        response.status(errResponse.statusCode).json(errResponse);

        super.catch(exception, host)
    }
}