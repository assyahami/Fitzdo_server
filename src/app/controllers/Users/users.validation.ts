import { body } from "express-validator";
import { validateResult } from "../../utils";
import { NextFunction, Response, Request } from "express";

const usersValidations = [
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is not valid'),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
    }
]

export { usersValidations };