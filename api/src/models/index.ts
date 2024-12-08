import { DataTypes } from "sequelize";
import { getSequelizeInstance } from "../config/database";
import User from "./user";
import Post from "./post";
import logger from "../utils/logger";
// import Tag from "./tag";
import Comment from "./comment";

/**
 * Here, we initialize all the models to synchronize with the DB
 */

export const initializeModels = async () => {
    const sequelize = await getSequelizeInstance();
    // Initialize models first
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            bio: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            view: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            paranoid: true
        }
    );

    Post.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.JSON,
                allowNull: false,
            },
            media: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            published: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            view: {
                type: DataTypes.INTEGER,
                allowNull: true,
            }
        },
        {
            sequelize,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: true
        }
    );

    // Tag.init(

    //     {
    //         id: {
    //             type: DataTypes.UUID,
    //             defaultValue: DataTypes.UUIDV4,
    //             primaryKey: true,
    //             autoIncrement: true,
    //             allowNull: false
    //         },
    //         name: {
    //             type: DataTypes.STRING,
    //             allowNull: false,
    //         },
    //         description: {
    //             type: DataTypes.TEXT,
    //             allowNull: false,
    //         },
    //     },
    //     {
    //         sequelize,
    //         modelName: 'Tag',
    //         tableName: 'tags',
    //         paranoid: true
    //     }
    // );

    Comment.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            postId: {
                type: DataTypes.UUID,
                references: {
                    model: 'posts',
                    key: 'id'
                }
            },
            userId: {
                type: DataTypes.UUID,
                references: {
                    model: 'users',
                    key: 'id'
                }
            }
        },
        {
            sequelize,
            modelName: "Comment",
            tableName: "comments",
            paranoid: true
        }
    )

    // const PostTag = sequelize.define('PostTag', {
    //     id: {
    //         type: DataTypes.UUID,
    //         defaultValue: DataTypes.UUIDV4,
    //         primaryKey: true,
    //     },
    // }, { tableName: 'post_tags' });

    // Set up associations after both models are initialized
    User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
    Post.belongsTo(User, { foreignKey: 'userId', as: 'author' });

    Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
    Comment.belongsTo(Post, { foreignKey: 'postId' });

    User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
    Comment.belongsTo(User, { foreignKey: 'userId', as: 'commenter' });

    // Post.belongsToMany(Tag, { through: 'PostTag', foreignKey: 'postId', as: 'tags' });
    // Tag.belongsToMany(Post, { through: 'PostTag', foreignKey: 'tagId', as: 'posts' });

    logger.info("Models initialized successfully");
};

export { User, Post, Comment }; 