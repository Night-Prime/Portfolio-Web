import { Comment, Post } from "../models";
import { successResponse, errorResponse } from "../utils/response";
import logger from "../utils/logger";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const createComment = async (req: any, res: Response, next: NextFunction) => {
    const { content, postId } = req.body;
    const userId = req.user?.id;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.info(`Validation Error: ${JSON.stringify(errors.array())}`);
            return errorResponse(res, {
                statusCode: 400,
                message: "Validation error:",
                errors: errors.array(),
            });
        }

        // Check if the post exists
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found."
            });
        }

        // Create the comment
        const comment = await Comment.create({
            content,
            postId,
            userId
        });

        // Return a successful response
        return successResponse(res, {
            statusCode: 201,
            message: "Comment made successfully",
            data: comment
        })

    } catch (error) {
        logger.error(`Error trying to create Comment: ${error}`);
        next(error);
        return errorResponse(res, {
            statusCode: 500,
            message: "Error trying to create Comment"
        });

    }
};

export const deleteComment = async (req: any, res: Response, next: NextFunction) => {
    const { commentId } = req.params;
    const userId = req.user?.id;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.info(`Validation Error: ${JSON.stringify(errors.array())}`);
            return errorResponse(res, {
                statusCode: 400,
                message: "Validation error:",
                errors: errors.array(),
            });
        }

        // Check if the comment exists
        const comment = await Comment.findOne({
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


        await comment.destroy();

        // Return a success response
        return successResponse(res, {
            statusCode: 200,
            message: "Comment deleted successfully",
            data: comment
        })

    } catch (error) {
        logger.error(`Error trying to delete Comment: ${error}`);
        next(error);
        return errorResponse(res, {
            statusCode: 500,
            message: "Error trying to delete Comment"
        });
    }
};