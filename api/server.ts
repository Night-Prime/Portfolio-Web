import http from 'http';
import createApp from "./app";
import { PORT } from "./src/config";
import logger from './src/utils/logger';

const app = createApp();
const server = http.createServer(app);

const startServer = async (): Promise<void> => {
    try {
        server.listen(PORT, () => {
            console.log(`Dhaniel Service running on PORT:${PORT}`)
        })
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

process.on('unhandledRejection', (reason: Error) => {
    logger.error('Unhandled Rejection:', reason);
    throw reason;
});

process.on('uncaughtException', (error: Error) => {
    logger.error('Uncaught Exception:', error);
    gracefulShutdown(1);
});

const gracefulShutdown = (exitCode: number) => {
    logger.info('Graceful shutdown initiated');
    server.close(() => {
        logger.info('Server closed');
        process.exit(exitCode);
    });

    setTimeout(() => {
        logger.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown(0));
process.on('SIGINT', () => gracefulShutdown(0));

startServer();
