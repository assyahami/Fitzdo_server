import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../models/Users";
import ApiResponseHandle from "../../helper/response_helpers/ApiResponseHandle";
import jwt from "jsonwebtoken";

const RegisterUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return ApiResponseHandle.getExistsResult(
                { message: "User already exists" },
                res
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createNewUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return ApiResponseHandle.getSuccessResult(
            { data: createNewUser },
            res
        );
    } catch (error) {
        ApiResponseHandle.serverError(error, res);
    }
};

const loginUsers = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return ApiResponseHandle.getNotFoundmessage(
                "Invalid email or password",
                res
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return ApiResponseHandle.getNotFoundmessage(
                "Invalid email or password",
                res
            );
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: process.env.JWT_SECRET_EXPIRES_IN }
        );

        return ApiResponseHandle.getSuccessResult(
            {
                accessToken: token,
                user,
            },
            res
        );
    } catch (error) {
        ApiResponseHandle.serverError(error, res);
    }
};

export {
    RegisterUser,
    loginUsers
}