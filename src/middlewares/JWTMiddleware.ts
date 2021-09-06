import express from "express";
import {Jwt} from "../models/Jwt";
import jwt from 'jsonwebtoken';
import {ErrorResponse} from "../models/ErrorResponse";
import {error} from "winston";

// @ts-ignore
const jwtSecret: string = process.env.JWT_SECRET;
class JWTMiddleware {

    validJWTNeeded(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ) {
        if (request.headers['authorization']) {
            try {
                const authorization = request.headers['authorization'].split(' ');
                if (authorization[0] !== 'Bearer') {
                    return response.status(401).send();
                } else {
                    response.locals.jwt = jwt.verify(
                        authorization[1],
                        jwtSecret
                    ) as Jwt;
                    next();
                }
            } catch (err) {
                console.log(err);
                return response.status(403).send(new ErrorResponse(403, err.message, ''));
            }
        } else {
            return response.status(401).send();
        }
    }
}


export default new JWTMiddleware();

