"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("./src/middleware");
// Setting up the app with its middleware
const createApp = () => {
    const app = (0, express_1.default)();
    (0, middleware_1.setupMiddleware)(app);
    return app;
};
exports.default = createApp;
