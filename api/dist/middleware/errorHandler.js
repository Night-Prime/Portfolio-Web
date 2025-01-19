"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleNotFound = exports.errorHandler = exports.AppError = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const config_1 = require("../config");
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
/**
 * @description Consider this a robust error handler
 */
const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.isOperational ? err.message : "Something went wrong!";
    logger_1.default.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip} - Stack: ${err.stack}`);
    if (config_1.NODE_ENV === "development") {
        res.status(statusCode).json({
            success: false,
            error: err.message,
            stack: err.stack,
        });
    }
    else {
        res.status(statusCode).json({
            success: false,
            error: message,
        });
    }
};
exports.errorHandler = errorHandler;
const handleNotFound = (req, res, next) => {
    const err = new AppError(`Not Found - ${req.originalUrl}`, 404);
    next(err);
};
exports.handleNotFound = handleNotFound;
