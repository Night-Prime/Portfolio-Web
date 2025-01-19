"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentByIdValidation = exports.createCommentValidation = exports.getTagByIdValidation = exports.createTagValidation = exports.grabPostByIdValidation = exports.createPostValidation = exports.userRegisterValidation = void 0;
const express_validator_1 = require("express-validator");
/**
 * Handles the Server-side validation of incoming requests
 */
const userRegisterValidation = () => {
    return [
        (0, express_validator_1.body)("name")
            .notEmpty()
            .withMessage("Name is required.")
            .isString()
            .withMessage("Name must be a string.")
            .isLength({ min: 2 })
            .withMessage("Name must be at least 2 characters long."),
        (0, express_validator_1.body)("email")
            .notEmpty()
            .withMessage("Email is required.")
            .isEmail()
            .withMessage("Email must be a valid email address.")
            .normalizeEmail()
            .isLength({ max: 255 })
            .withMessage("Email must be at most 255 characters long."),
        (0, express_validator_1.body)("password")
            .notEmpty()
            .withMessage("Password is required.")
            .isString()
            .withMessage("Password must be a string.")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long."),
        (0, express_validator_1.body)("bio")
            .optional()
            .isString()
            .withMessage("Bio must be a string.")
            .isLength({ max: 500 })
            .withMessage("Bio must be at most 500 characters long.")
    ];
};
exports.userRegisterValidation = userRegisterValidation;
// For Posts
const createPostValidation = () => {
    return [
        (0, express_validator_1.body)("userId")
            .isUUID()
            .notEmpty()
            .withMessage("Author is required"),
        (0, express_validator_1.body)("title")
            .notEmpty()
            .isString()
            .withMessage("Title is required."),
        (0, express_validator_1.body)("content")
            .isObject()
            .notEmpty()
            .withMessage("Fill in content")
            .withMessage("Article incomplete without an article"),
        (0, express_validator_1.body)("published")
            .notEmpty()
            .withMessage("Publish state is required!")
            .isBoolean()
            .withMessage("True or False?"),
        (0, express_validator_1.body)("tags")
            .optional()
            .isArray()
    ];
};
exports.createPostValidation = createPostValidation;
const grabPostByIdValidation = () => {
    return [
        (0, express_validator_1.param)("id")
            .isUUID()
            .notEmpty()
            .withMessage("Post ID is required!")
    ];
};
exports.grabPostByIdValidation = grabPostByIdValidation;
// For Tags
const createTagValidation = () => {
    return [
        (0, express_validator_1.body)("name")
            .notEmpty()
            .withMessage("Name is required.")
            .isString()
            .withMessage("Name must be a string.")
            .isLength({ min: 2 })
            .withMessage("Name must be at least 2 characters long."),
        (0, express_validator_1.body)("description")
            .notEmpty()
            .isString()
            .withMessage("Bio must be a string.")
            .isLength({ max: 500 })
    ];
};
exports.createTagValidation = createTagValidation;
const getTagByIdValidation = () => {
    return [
        (0, express_validator_1.param)("tagId")
            .isUUID()
            .notEmpty()
            .withMessage("Tag ID is required!")
    ];
};
exports.getTagByIdValidation = getTagByIdValidation;
// For Comments
const createCommentValidation = () => {
    return [
        (0, express_validator_1.body)("content")
            .notEmpty()
            .withMessage("Comment section can't be empty"),
        (0, express_validator_1.body)("postId")
            .isUUID()
            .notEmpty()
            .withMessage("Post ID is required!")
    ];
};
exports.createCommentValidation = createCommentValidation;
const getCommentByIdValidation = () => {
    return [
        (0, express_validator_1.param)("commentId")
            .isUUID()
            .notEmpty()
            .withMessage("Comment ID is required!")
    ];
};
exports.getCommentByIdValidation = getCommentByIdValidation;
