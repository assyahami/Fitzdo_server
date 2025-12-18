import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Users from "../models/Users";

interface AuthRequest extends Request {
    user?: JwtPayload | string;

}
async function verifyResetToken(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const reqHeaders = req.headers['authorization'];

        if (!reqHeaders) {
            return res.status(401).json({
                message: 'UnAuthorized',
                status: 'fail',
            });
        }

        let token = reqHeaders && reqHeaders.split('Bearer')[1].trim();
        const decode = jwt.verify(token, process.env.RESET_PWD_JWT_SECRET as string) as JwtPayload;

        if (decode) {
            const findUser = await Users.findById(decode._id);
            if (!findUser) {
                return res.status(401).json({
                    message: 'UnAuthorized',
                    status: 'fail',
                });
            }
            req.user = decode;
            next();
        } else {
            return res.status(401).json({
                message: 'UnAuthorized',
                status: 'fail',
            });
        }
    } catch (error) {
        console.error(error);
        const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
        res.status(401).json({
            message: errorMessage,
            status: 'fail',
        });
    }
}

async function verifyAuthToken(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const reqHeaders = req.headers['authorization'];
        if (!reqHeaders) {
            return res.status(401).json({
                message: 'UnAuthorized',
                status: 'fail',
            });
        }

        let token = reqHeaders && reqHeaders?.split('Bearer')[1].trim();
        const decode = token && jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        if (decode && decode._id) {
            const findUser = await Users.findById(decode._id);
            if (!findUser) {
                return res.status(401).json({
                    message: 'UnAuthorized',
                    status: 'fail',
                });
            }
            req.user = decode;
            next();
        } else {
            return res.status(401).json({
                message: 'UnAuthorized',
                status: 'fail',
            });
        }
    } catch (error) {
        console.error(error);
        const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
       return res.status(401).json({
            message: errorMessage,
            status: 'fail',
        });
    }
}

export { verifyResetToken, verifyAuthToken };