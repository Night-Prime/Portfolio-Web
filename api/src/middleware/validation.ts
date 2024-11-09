import { body, param } from "express-validator";

/**
 * Handles the Server-side validation of incoming requests
 */

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

// For Posts
export const createPostValidation = () => {
    return [
        body("userId")
            .isUUID()
            .notEmpty()
            .withMessage("Author is required"),

        body("title")
            .notEmpty()
            .isString()
            .withMessage("Title is required."),

        body("content")
            .notEmpty()
            .withMessage("Fill in content")
            .isLength({ min: 2 })
            .withMessage("Name must be at least 2 characters long."),

        body("published")
            .notEmpty()
            .withMessage("Publish state is required!")
            .isBoolean()
            .withMessage("True or False?"),

        body("tags")
            .optional()
            .isArray()
    ]
}

export const grabPostByIdValidation = () => {
    return [
        param("postId")
            .isUUID()
            .notEmpty()
            .withMessage("Post ID is required!")
    ]
}

// For Tags
export const createTagValidation = () => {
    return [
        body("name")
            .notEmpty()
            .withMessage("Name is required.")
            .isString()
            .withMessage("Name must be a string.")
            .isLength({ min: 2 })
            .withMessage("Name must be at least 2 characters long."),

        body("description")
            .notEmpty()
            .isString()
            .withMessage("Bio must be a string.")
            .isLength({ max: 500 })
    ]
}

export const getTagByIdValidation = () => {
    return [
        param("tagId")
            .isUUID()
            .notEmpty()
            .withMessage("Tag ID is required!")
    ]
}

// For Comments
export const createCommentValidation = () => {
    return [
        body("content")
            .notEmpty()
            .withMessage("Comment section can't be empty"),

        body("postId")
            .isUUID()
            .notEmpty()
            .withMessage("Post ID is required!")
    ]
}

export const getCommentByIdValidation = () => {
    return [
        param("commentId")
            .isUUID()
            .notEmpty()
            .withMessage("Comment ID is required!")
    ]
}