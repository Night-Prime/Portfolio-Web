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
exports.userLogin = exports.userRegister = void 0;
const models_1 = require("../models");
const response_1 = require("../utils/response");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../utils/logger"));
const express_validator_1 = require("express-validator");
const SECRET_KEY = process.env.COOKIE_SECRET;
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, bio } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            logger_1.default.info(`Validation Error: ${errors.array()}`);
            return (0, response_1.errorResponse)(res, {
                statusCode: 400,
                message: "Validation error:",
                errors: errors.array(),
            });
        }
        const newUser = yield models_1.User.create({
            name,
            email,
            password: hashedPassword,
            bio
        });
        logger_1.default.info(`Creating User: ${email}`);
        return (0, response_1.successResponse)(res, {
            data: newUser,
            statusCode: 201,
            message: "User has been registered sucessfully",
        });
    }
    catch (error) {
        logger_1.default.error("Registration Failed", error);
        return (0, response_1.errorResponse)(res, {
            statusCode: 500,
            message: "Server Error occured during Registration"
        });
    }
});
exports.userRegister = userRegister;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield models_1.User.findOne({ where: { email } });
        if (!user) {
            logger_1.default.error("User not Found");
            return (0, response_1.errorResponse)(res, {
                statusCode: 404,
                message: "User not Found"
            });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, (yield user).password);
        if (!passwordMatch) {
            logger_1.default.error("Wrong Password");
            return (0, response_1.errorResponse)(res, {
                statusCode: 401,
                message: "Wrong Password"
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, SECRET_KEY, { expiresIn: '12h' });
        logger_1.default.info("Sucessful Login");
        return (0, response_1.successResponse)(res, {
            data: { user, token },
            statusCode: 200,
            message: "Succesful Login"
        });
    }
    catch (error) {
        logger_1.default.error("Login Failed!", error);
        return (0, response_1.errorResponse)(res, {
            statusCode: 500,
            message: "Server Error occured during Login"
        });
    }
});
exports.userLogin = userLogin;
