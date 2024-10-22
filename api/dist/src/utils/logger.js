"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const config_1 = require("../config");
const { combine, timestamp, errors, splat, json, colorize } = winston_1.default.format;
/**
 * @description Setting up logging mechanism for the service using winston
 */
const logger = winston_1.default.createLogger({
    level: config_1.NODE_ENV === "production" ? "info" : "debug",
    format: combine(colorize({ all: true }), timestamp(), json(), splat(), errors({ stack: true })),
    defaultMeta: { service: 'dhaniel-service' },
    transports: [
        new winston_1.default.transports.File({ filename: 'error.log', level: 'error' }),
        new winston_1.default.transports.File({ filename: 'combined.log' })
    ],
    exceptionHandlers: [
        new winston_1.default.transports.File({ filename: 'exception.log' }),
    ],
    rejectionHandlers: [
        new winston_1.default.transports.File({ filename: 'rejections.log' }),
    ],
});
// For non-production environments, we write to the console
if (config_1.NODE_ENV !== 'production') {
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.simple(),
    }));
}
exports.default = logger;
