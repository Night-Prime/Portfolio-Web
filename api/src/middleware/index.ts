import express from 'express';
import cors from 'cors';
import session from 'express-session';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import passport from 'passport';
import { corsOptions, sessionOptions } from '../config/index'
import router from '../routes';
import { errorHandler } from './errorHandler';

/**
 * This takes all the middleware and set to one interface
 */

export const setupMiddleware = (app: express.Application): void => {
    app.use(cors(corsOptions));
    app.use(session(sessionOptions));
    app.use(express.json({ limit: '20mb' }));
    app.use(express.urlencoded({ limit: '20mb', extended: true }));
    app.use(helmet());
    app.use(morgan('tiny'));
    app.use(cookieParser());
    app.use(compression());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/api/v1', router);
    app.use(errorHandler);
};
