import express from 'express';
import { setupMiddleware } from './src/middleware';

// Setting up the app with its middleware
const createApp = (): express.Application => {
    const app = express();
    setupMiddleware(app);
    return app;
}

export default createApp;