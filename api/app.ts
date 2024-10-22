import express from 'express';
import { setupMiddleware } from './src/middleware';

const createApp = (): express.Application => {
    const app = express();
    setupMiddleware(app);
    return app;
}

export default createApp;