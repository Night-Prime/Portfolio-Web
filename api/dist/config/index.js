"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionOptions = exports.corsOptions = exports.NODE_ENV = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
exports.PORT = process.env.PORT || 4200;
exports.NODE_ENV = process.env.NODE_ENV || 'development';
exports.corsOptions = {
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : 'http://localhost:3000/',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
};
exports.sessionOptions = {
    secret: process.env.SESSION_SECRET || 'Dhaniel',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: exports.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 360000
    }
};
