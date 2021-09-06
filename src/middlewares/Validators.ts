import {validate} from "class-validator";
import express from "express";
import {StatusCodes} from "../enums/StatusCodes";
import {ErrorResponse} from "../models/ErrorResponse";

class Validators {

    async validatePaginationObject(request: express.Request,
                                   response: express.Response,
                                   next: express.NextFunction) {
        if (!request.query.page && !request.query.limit) {
            response.status(StatusCodes.NOT_FOUND).send(new ErrorResponse(400, 'Page and Limit are required'))
        } else {
            next();
        }
    }
}

export default new Validators();