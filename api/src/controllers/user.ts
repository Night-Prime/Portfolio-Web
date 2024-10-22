import { User } from "../models"
import { errorResponse, successResponse } from "../utils/response";
import { Response, Request, NextFunction } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from "../utils/logger";
import { validationResult } from "express-validator";

const SECRET_KEY = process.env.COOKIE_SECRET!;

export const userRegister = async (req: Request, res: Response) => {
    const { name, email, password, bio } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.info(`Validation Error: ${errors.array()}`)
            return errorResponse(res, {
                statusCode: 400,
                message: "Validation error:",
                errors: errors.array(),
            });
        }

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            bio
        });
        logger.info(`Creating User: ${email}`);

        return successResponse(res, {
            data: newUser,
            statusCode: 201,
            message: "User has been registered sucessfully",
        })

    } catch (error) {
        logger.error("Registration Failed", error);
        return errorResponse(res, {
            statusCode: 500,
            message: "Server Error occured during Registration"
        })
    }
}

export const userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            logger.error("User not Found")
            return errorResponse(res, {
                statusCode: 404,
                message: "User not Found"
            })
        }

        const passwordMatch = await bcrypt.compare(password, (await user).password);
        if (!passwordMatch) {
            logger.error("Wrong Password")
            return errorResponse(res, {
                statusCode: 401,
                message: "Wrong Password"
            })
        }

        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '12h' });

        logger.info("Sucessful Login");
        return successResponse(res, {
            data: { user, token },
            statusCode: 200,
            message: "Succesful Login"
        })

    } catch (error) {
        logger.error("Login Failed!", error)
        return errorResponse(res, {
            statusCode: 500,
            message: "Server Error occured during Login"
        })
    }
}