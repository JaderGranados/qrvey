import { NextFunction, Request, Response } from 'express';
import { Auth } from './services/auth.service';


export module Middlewares {
    export const isValidToken = (request: Request, response: Response, next: NextFunction):void => {
        const token = Auth.Services.isValidToken(request.headers.authorization);
        if (token){
            next();
        }
        else{
            response.status(401).send({
                success: false,
                errorMessage: 'Unauthorized'
            });
        }
    }
}