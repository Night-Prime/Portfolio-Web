"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const config_1 = require("./src/config");
const logger_1 = __importDefault(require("./src/utils/logger"));
const models_1 = require("./src/models");
const app = (0, app_1.default)();
const server = http_1.default.createServer(app);
/**
 * Connecting the Express App to the Server
 */
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, models_1.initializeModels)();
        server.listen(config_1.PORT, () => {
            logger_1.default.info(`Dhaniel Service running on PORT:${config_1.PORT}`);
        });
    }
    catch (error) {
        logger_1.default.error('Failed to start server:', error);
        process.exit(1);
    }
});
// Handling uncaught exceptions & rejections
process.on('unhandledRejection', (reason) => {
    logger_1.default.error('Unhandled Rejection:', reason);
    throw reason;
});
process.on('uncaughtException', (error) => {
    logger_1.default.error('Uncaught Exception:', error);
    gracefulShutdown(1);
});
//note: would need set a Restart mechanism instead(PM2)
const gracefulShutdown = (exitCode) => {
    logger_1.default.info('Graceful shutdown initiated');
    server.close(() => {
        logger_1.default.info('Server closed');
        process.exit(exitCode);
    });
    setTimeout(() => {
        logger_1.default.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);
};
process.on('SIGTERM', () => gracefulShutdown(0));
process.on('SIGINT', () => gracefulShutdown(0));
startServer();
