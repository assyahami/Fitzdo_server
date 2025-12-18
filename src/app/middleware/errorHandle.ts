import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';

// Middleware to handle Mongoose validation errors
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof MongooseError.ValidationError) {
        const errors = Object.keys(err.errors).map(key => ({
            field: key,
            message: err.errors[key].message
        }));
        return res.status(400).json({
            message: 'Validation Error',
            errors: errors
        });
    }

    // Other error handling
    if (err.status) {
        return res.status(err.status).json({
            message: err.message
        });
    }

    // Default to 500 server error
    res.status(500).json({
        message: 'Internal Server Error',
        error: err.message
    });
};

export default errorHandler;
