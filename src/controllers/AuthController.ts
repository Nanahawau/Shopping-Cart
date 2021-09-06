import express from "express";
import debug from "debug";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import AuthService from "../services/AuthService";
import {ErrorResponse} from "../models/ErrorResponse";
import {verify} from "argon2";

const log: debug.IDebugger = debug('app:auth-controller');
// @ts-ignore
const jwtSecret: string = process.env.JWT_SECRET;
// @ts-ignore
const tokenExpirationInSeconds: number = process.env.TOKEN_EXPIRATION;

class AuthController {

    async login(request: express.Request, response: express.Response) {
        try {
            const user = await AuthService.findByEmail(request.body.email);
            if (user) {
                if (await verify(user.password, request.body.password)) {
                    const token = jwt.sign(request.body, jwtSecret, {
                        expiresIn: tokenExpirationInSeconds,
                    });
                    return response
                        .status(201)
                        .send({accessToken: token, expiry: tokenExpirationInSeconds});
                } else {
                    return response
                        .status(401)
                        .send(new ErrorResponse(401, 'Password is incorrect', ''));
                }
            } else {
                return response
                    .status(401)
                    .send(new ErrorResponse(401, `User doesn't exist`, ''));
            }

        } catch (err) {
            log('createJWT error: %O', err);
            return response.status(500).send();
        }
    }
}


export default new AuthController();