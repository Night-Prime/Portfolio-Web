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
exports.deleteComment = exports.createComment = void 0;
const models_1 = require("../models");
const response_1 = require("../utils/response");
const logger_1 = __importDefault(require("../utils/logger"));
const express_validator_1 = require("express-validator");
const createComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { content, postId } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
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
        // Check if the post exists
        const post = yield models_1.Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found."
            });
        }
        // Create the comment
        const comment = yield models_1.Comment.create({
            content,
            postId,
            userId
        });
        // Return a successful response
        return (0, response_1.successResponse)(res, {
            statusCode: 201,
            message: "Comment made successfully",
            data: comment
        });
    }
    catch (error) {
        logger_1.default.error(`Error trying to create Comment: ${error}`);
        next(error);
        return (0, response_1.errorResponse)(res, {
            statusCode: 500,
            message: "Error trying to create Comment"
        });
    }
});
exports.createComment = createComment;
const deleteComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { commentId } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
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
        // Check if the comment exists
        const comment = yield models_1.Comment.findOne({
            where: {
                id: commentId,
                userId
            }
        });
        if (!comment) {
            return res.status(404).json({
                message: "Comment not found or you don't have permission to delete it."
            });
        }
        yield comment.destroy();
        // Return a success response
        return (0, response_1.successResponse)(res, {
            statusCode: 200,
            message: "Comment deleted successfully",
            data: comment
        });
    }
    catch (error) {
        logger_1.default.error(`Error trying to delete Comment: ${error}`);
        next(error);
        return (0, response_1.errorResponse)(res, {
            statusCode: 500,
            message: "Error trying to delete Comment"
        });
    }
});
exports.deleteComment = deleteComment;
