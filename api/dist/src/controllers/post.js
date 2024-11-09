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
exports.deletePost = exports.getPostById = exports.getPosts = exports.createPost = void 0;
const models_1 = require("../models");
const response_1 = require("../utils/response");
const logger_1 = __importDefault(require("../utils/logger"));
const express_validator_1 = require("express-validator");
/**
 * Controllers for Post
 */
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, published, userId, tags } = req.body;
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            logger_1.default.info(`Validation Error: ${JSON.stringify(errors.array())}`);
            return (0, response_1.errorResponse)(res, {
                statusCode: 400,
                message: "Validation error",
                errors: JSON.stringify(errors.array())
            });
        }
        // Find the user
        const existingUser = yield models_1.User.findByPk(userId);
        if (!existingUser) {
            return (0, response_1.errorResponse)(res, {
                statusCode: 404,
                message: "User doesn't exist!",
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
            data: newPost,
        });
    }
    catch (error) {
        logger_1.default.error(`Error trying to create Post: ${error}`);
        next(error);
        return (0, response_1.errorResponse)(res, {
            statusCode: 500,
            message: "Error trying to create Post",
        });
    }
});
exports.createPost = createPost;
const getPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { limit, offset } = req.query;
    const authorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const posts = yield models_1.Post.findAll({
            where: { userId: authorId },
            limit: limit ? parseInt(limit) : undefined,
            offset: offset ? parseInt(offset) : undefined,
            include: [{ model: models_1.User, attributes: ['name', 'email'], as: 'author' }, { model: models_1.Comment, attributes: ['content'], as: 'comments' }]
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
const getPostById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { postId } = req.params;
    const authorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            logger_1.default.info(`Validation Error: ${JSON.stringify(errors.array())}`);
            return (0, response_1.errorResponse)(res, {
                statusCode: 400,
                message: "Validation error:",
                errors: errors.array(),
            });
        }
        const post = yield models_1.Post.findOne({
            where: { id: postId, userId: authorId },
            include: [{ model: models_1.User, attributes: ['name', 'email'], as: 'author' }]
        });
        if (!post) {
            return (0, response_1.errorResponse)(res, {
                statusCode: 404,
                message: 'Post not found',
            });
        }
        logger_1.default.info(`Retrieved post with ID: ${postId}`);
        return (0, response_1.successResponse)(res, {
            statusCode: 200,
            message: 'Post retrieved successfully',
            data: post,
        });
    }
    catch (error) {
        logger_1.default.error(`Error trying to retrieve post with ID: ${postId}: ${error}`);
        return (0, response_1.errorResponse)(res, {
            statusCode: 500,
            message: 'Error trying to retrieve post',
        });
    }
});
exports.getPostById = getPostById;
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { postId } = req.params;
    const authorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            logger_1.default.info(`Validation Error: ${JSON.stringify(errors.array())}`);
            return (0, response_1.errorResponse)(res, {
                statusCode: 400,
                message: "Validation error:",
                errors: errors.array(),
            });
        }
        const post = yield models_1.Post.findOne({
            where: { id: postId, userId: authorId },
        });
        if (!post) {
            return (0, response_1.errorResponse)(res, {
                statusCode: 404,
                message: 'Post not found or you do not have permission to delete this post',
            });
        }
        logger_1.default.info(`Deleted post with ID: ${postId}`);
        yield post.destroy();
        return (0, response_1.successResponse)(res, {
            statusCode: 200,
            message: 'Post deleted successfully',
            data: []
        });
    }
    catch (error) {
        logger_1.default.error(`Error trying to delete post with ID: ${postId}: ${error}`);
        return (0, response_1.errorResponse)(res, {
            statusCode: 500,
            message: 'Error trying to delete post',
        });
    }
});
exports.deletePost = deletePost;
