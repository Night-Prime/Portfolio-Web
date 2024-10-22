import winston from 'winston';
import { NODE_ENV } from '../config';


const { combine, timestamp, errors, splat, json, colorize } = winston.format;

/**
 * @description Setting up logging mechanism for the service using winston
 */

const logger = winston.createLogger({
    level: NODE_ENV === "production" ? "info" : "debug",
    format: combine(colorize({ all: true }), timestamp(), json(), splat(), errors({ stack: true })),
    defaultMeta: { service: 'dhaniel-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exception.log' }),
    ],
    rejectionHandlers: [
        new winston.transports.File({ filename: 'rejections.log' }),
    ],
});

// For non-production environments, we write to the console
if (NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}


export default logger;