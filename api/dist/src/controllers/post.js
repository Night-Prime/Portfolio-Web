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
exports.getPosts = exports.createPost = void 0;
const models_1 = require("../models");
const response_1 = require("../utils/response");
const logger_1 = __importDefault(require("../utils/logger"));
/**
 * Controllers for Post
 */
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, published, userId } = req.body;
    try {
        // Find the user
        const existingUser = yield models_1.User.findByPk(userId);
        logger_1.default.info(`User: ${existingUser}`);
        if (!existingUser) {
            return (0, response_1.errorResponse)(res, {
                statusCode: 404,
                message: "User doesn't exist!"
            });
        }
        // Create the new post
        const newPost = yield models_1.Post.create({
            userId,
            title,
            content,
            published
        });
        logger_1.default.info(`New Post created: ${JSON.stringify(newPost)}`);
        return (0, response_1.successResponse)(res, {
            statusCode: 201,
            message: "Post created successfully",
            data: newPost
        });
    }
    catch (error) {
        logger_1.default.error(`Error trying to create Post: ${error}`);
        return (0, response_1.errorResponse)(res, {
            statusCode: 500,
            message: "Error trying to create Post"
        });
    }
});
exports.createPost = createPost;
const getPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, offset } = req.query;
    try {
        const posts = yield models_1.Post.findAll({
            limit: limit ? parseInt(limit) : undefined,
            offset: offset ? parseInt(offset) : undefined,
            include: [{ model: models_1.User, attributes: ['name', 'email'] }]
        });
        logger_1.default.info(`Retrieved ${posts.length} posts`);
        return (0, response_1.successResponse)(res, {
            statusCode: 200,
            message: 'Posts retrieved successfully',
            data: posts,
        });
    }
    catch (error) {
        logger_1.default.error(`Error trying to retrieve posts: ${error}`);
        return (0, response_1.errorResponse)(res, {
            statusCode: 500,
            message: 'Error trying to retrieve posts',
        });
    }
});
exports.getPosts = getPosts;
