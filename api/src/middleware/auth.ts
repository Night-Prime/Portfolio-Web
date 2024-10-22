import { Response, Request, NextFunction } from "express";
import JWT, { JwtPayload } from "jsonwebtoken";
import { errorResponse } from "../utils/response";
import logger from "../utils/logger";

const SECRET_KEY = process.env.COOKIE_SECRET!;

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return errorResponse(res, {
            statusCode: 401,
            message: 'Unauthorized Access: No token provided',
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = JWT.verify(token, SECRET_KEY) as JwtPayload & { id: string, email: string };

        req.user = decoded;
        next();
    } catch (err) {
        logger.error('Token verification failed!', err);
        return errorResponse(res, {
            statusCode: 403,
            message: 'Token verification failed!',
        });
    }
};