"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegisterValidation = void 0;
const express_validator_1 = require("express-validator");
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
