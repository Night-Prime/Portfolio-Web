import { Post, User } from "../models";
import { NextFunction, Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import logger from "../utils/logger";

/**
 * Controllers for Post
 */

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    const { title, content, published, userId } = req.body;

    try {
        // Find the user
        const existingUser = await User.findByPk(userId);
        logger.info(`User: ${existingUser}`);
        if (!existingUser) {
            return errorResponse(res, {
                statusCode: 404,
                message: "User doesn't exist!"
            });
        }

        // Create the new post
        const newPost = await Post.create({
            userId,
            title,
            content,
            published
        });

        logger.info(`New Post created: ${JSON.stringify(newPost)}`);

        return successResponse(res, {
            statusCode: 201,
            message: "Post created successfully",
            data: newPost
        });
    } catch (error) {
        logger.error(`Error trying to create Post: ${error}`);
        return errorResponse(res, {
            statusCode: 500,
            message: "Error trying to create Post"
        });
    }
};

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    const { limit, offset } = req.query;

    try {
        const posts = await Post.findAll({
            limit: limit ? parseInt(limit as string) : undefined,
            offset: offset ? parseInt(offset as string) : undefined,
            include: [{ model: User, attributes: ['name', 'email'] }]
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