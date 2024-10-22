import { body } from "express-validator";

export const userRegisterValidation = () => {
    return [
        body("name")
            .notEmpty()
            .withMessage("Name is required.")
            .isString()
            .withMessage("Name must be a string.")
            .isLength({ min: 2 })
            .withMessage("Name must be at least 2 characters long."),

        body("email")
            .notEmpty()
            .withMessage("Email is required.")
            .isEmail()
            .withMessage("Email must be a valid email address.")
            .normalizeEmail()
            .isLength({ max: 255 })
            .withMessage("Email must be at most 255 characters long."),

        body("password")
            .notEmpty()
            .withMessage("Password is required.")
            .isString()
            .withMessage("Password must be a string.")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long."),

        body("bio")
            .optional()
            .isString()
            .withMessage("Bio must be a string.")
            .isLength({ max: 500 })
            .withMessage("Bio must be at most 500 characters long.")
    ];
};