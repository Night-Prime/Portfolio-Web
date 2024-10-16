import express from 'express';
import { setupMiddleware } from './src/middleware';
import router from './src/routes';
import { errorHandler } from './src/middleware/errorHandler';

const createApp = (): express.Application => {
    const app = express();
    setupMiddleware(app);
    app.use('/', router);
    app.use(errorHandler);
    return app;
}

export default createApp;