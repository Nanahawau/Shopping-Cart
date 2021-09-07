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

    /**
     * login method
     * @param request
     * @param response
     */
    async login(request: express.Request, response: express.Response) {
        try {
            // find user by email
            const user = await AuthService.findByEmail(request.body.email);

            // User validation : check if user doesn't exist
            if (!user) {
                return response
                    .status(401)
                    .send(new ErrorResponse(401, `User doesn't exist`, ''));
            }
            // Validate Password
            if (!await verify(user.password, request.body.password)) {
                return response
                    .status(401)
                    .send(new ErrorResponse(401, 'Password is incorrect', ''));
            }
        }
        catch (err) {
            log('createJWT error: %O', err);
            return response.status(500).send();
        }

        const token = jwt.sign(request.body, jwtSecret, {
            expiresIn: tokenExpirationInSeconds,
        });
        return response
            .status(201)
            .send({accessToken: token, expiry: tokenExpirationInSeconds});
    }
}


export default new AuthController();