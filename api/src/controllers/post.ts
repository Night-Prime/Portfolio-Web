import { Post, User, Comment } from "../models";
import { NextFunction, Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import logger from "../utils/logger";
import { validationResult } from "express-validator";

/**
 * Controllers for Post
 */

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    const { title, content, published, userId, tags, } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.info(`Validation Error: ${JSON.stringify(errors.array())}`);
            return errorResponse(res, {
                statusCode: 400,
                message: "Validation error",
                errors: JSON.stringify(errors.array())
            });
        }

        const mediaLink = req.file ? req.file.path : null;

        // Find the user
        const existingUser = await User.findByPk(userId);
        if (!existingUser) {
            return errorResponse(res, {
                statusCode: 404,
                message: "User doesn't exist!",
            });
        }

        // Create the new post
        const newPost = await Post.create({
            userId,
            title,
            content,
            published,
            media: mediaLink
        });

        logger.info(`New Post created: ${JSON.stringify(newPost)}`);

        return successResponse(res, {
            statusCode: 201,
            message: "Post created successfully",
            data: newPost,
        });
    } catch (error) {
        logger.error(`Error trying to create Post: ${error}`);
        next(error);
        return errorResponse(res, {
            statusCode: 500,
            message: "Error trying to create Post",
        });
    }
};

export const getPosts = async (req: any, res: Response, next: NextFunction) => {
    const { limit, offset } = req.query;
    const authorId = req.user?.id;

    try {
        const posts = await Post.findAll({
            where: { userId: authorId },
            limit: limit ? parseInt(limit as string) : undefined,
            offset: offset ? parseInt(offset as string) : undefined,
            include: [{ model: User, attributes: ['name', 'email'], as: 'author' }, { model: Comment, attributes: ['content'], as: 'comments' }]
        });

        logger.info(`Retrieved ${posts.length} posts`);

        return successResponse(res, {
            statusCode: 200,
            message: 'Posts retrieved successfully',
            data: posts,
        });
    } catch (error) {
        logger.error(`Error trying to retrieve posts: ${error}`);
        return errorResponse(res, {
            statusCode: 500,
            message: 'Error trying to retrieve posts',
        });
    }
};

export const getPostById = async (req: any, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    const authorId = req.user?.id;
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

        const post = await Post.findOne({
            where: { id: postId, userId: authorId },
            include: [{ model: User, attributes: ['name', 'email'], as: 'author' }]
        });

        if (!post) {
            return errorResponse(res, {
                statusCode: 404,
                message: 'Post not found',
            });
        }

        logger.info(`Retrieved post with ID: ${postId}`);

        return successResponse(res, {
            statusCode: 200,
            message: 'Post retrieved successfully',
            data: post,
        });
    } catch (error) {
        logger.error(`Error trying to retrieve post with ID: ${postId}: ${error}`);
        return errorResponse(res, {
            statusCode: 500,
            message: 'Error trying to retrieve post',
        });
    }
};

export const deletePost = async (req: any, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    const authorId = req.user?.id;

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

        const post = await Post.findOne({
            where: { id: postId, userId: authorId },
        });

        if (!post) {
            return errorResponse(res, {
                statusCode: 404,
                message: 'Post not found or you do not have permission to delete this post',
            });
        }

        logger.info(`Deleted post with ID: ${postId}`);
        await post.destroy();

        return successResponse(res, {
            statusCode: 200,
            message: 'Post deleted successfully',
            data: []
        });
    } catch (error) {
        logger.error(`Error trying to delete post with ID: ${postId}: ${error}`);
        return errorResponse(res, {
            statusCode: 500,
            message: 'Error trying to delete post',
        });
    }
};
