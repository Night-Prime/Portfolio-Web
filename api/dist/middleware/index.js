"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMiddleware = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const passport_1 = __importDefault(require("passport"));
const index_1 = require("../config/index");
const routes_1 = __importDefault(require("../routes"));
const errorHandler_1 = require("./errorHandler");
/**
 * This takes all the middleware and set to one interface
 */
const setupMiddleware = (app) => {
    app.use((0, cors_1.default)(index_1.corsOptions));
    app.use((0, express_session_1.default)(index_1.sessionOptions));
    app.use(express_1.default.json({ limit: '20mb' }));
    app.use(express_1.default.urlencoded({ limit: '20mb', extended: true }));
    app.use((0, helmet_1.default)());
    app.use((0, morgan_1.default)('tiny'));
    app.use((0, cookie_parser_1.default)());
    app.use((0, compression_1.default)());
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.use('/api/v1', routes_1.default);
    app.use(errorHandler_1.errorHandler);
};
exports.setupMiddleware = setupMiddleware;
