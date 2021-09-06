import express from "express";
import {validationResult} from "express-validator";

class BodyValidationMiddleware {
    verifyBodyFieldsErrors(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ) {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).send({ errors: errors.array() });
        }
        next();
    }
}

export default new BodyValidationMiddleware();