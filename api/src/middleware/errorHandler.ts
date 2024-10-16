import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { NODE_ENV } from "../config";

export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * @description Consider this a robust error handler
 */


export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || 500;
    let message = err.isOperational ? err.message : "Something went wrong!";

    logger.error(
        `${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip} - Stack: ${err.stack}`
    );

    if (NODE_ENV === "development") {
        res.status(statusCode).json({
            success: false,
            error: err.message,
            stack: err.stack,
        });
    } else {
        res.status(statusCode).json({
            success: false,
            error: message,
        });
    }
};

export const handleNotFound = (req: Request, res: Response, next: NextFunction) => {
    const err = new AppError(`Not Found - ${req.originalUrl}`, 404);
    next(err);
};

