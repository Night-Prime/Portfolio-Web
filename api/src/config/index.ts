import { configDotenv } from "dotenv";
import { CorsOptions } from "cors";
import { SessionOptions } from "express-session";

configDotenv();

export const PORT = process.env.PORT || 4200;
export const NODE_ENV = process.env.NODE_ENV || 'development';

export const corsOptions: CorsOptions = {
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
}

export const sessionOptions: SessionOptions = {
    secret: process.env.SESSION_SECRET || 'Dhaniel',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 360000
    }
}
