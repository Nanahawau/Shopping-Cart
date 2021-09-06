import {validate} from "class-validator";
import express from "express";
import {StatusCodes} from "../enums/StatusCodes";
import {ErrorResponse} from "../models/ErrorResponse";
import {query, body, check, validationResult} from 'express-validator'


class Validators {

    public validate =
            [query('page').not().isEmpty().withMessage('Page is required'),
                query('limit').not().isEmpty().withMessage('Limit is required')]

    async validatePaginationObject(request: express.Request,
                                   response: express.Response,
                                   next: express.NextFunction) {

        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            response.status(400).send(new ErrorResponse(400, 'Bad Request',  errors.array()))
        }
        else {
            next();
        }
    }


    async length(request: express.Request,
                                   response: express.Response,
                                   next: express.NextFunction) {

        const limit = parseInt(<string>request.query.limit);
        const  page =  parseInt(<string>request.query.page);

        if (limit < 1 || page < 1) {
            response.status(400).send(new ErrorResponse(400, 'Bad Request',
                {page: 'Page should be more than 1', limit:  'limit should be more than 1' }))
        }

        if (limit > 20 || page > 20) {
            response.status(400).send(new ErrorResponse(400, 'Bad Request',
                {page: 'Page should be less than 20', limit:  'limit should be less than 20' }))
        }
        else {
            next();
        }
    }


}

export default new Validators();