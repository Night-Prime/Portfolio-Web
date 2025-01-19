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
exports.Comment = exports.Post = exports.User = exports.initializeModels = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const post_1 = __importDefault(require("./post"));
exports.Post = post_1.default;
const logger_1 = __importDefault(require("../utils/logger"));
// import Tag from "./tag";
const comment_1 = __importDefault(require("./comment"));
exports.Comment = comment_1.default;
/**
 * Here, we initialize all the models to synchronize with the DB
 */
const initializeModels = () => __awaiter(void 0, void 0, void 0, function* () {
    const sequelize = yield (0, database_1.getSequelizeInstance)();
    // Initialize models first
    user_1.default.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        bio: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        },
        view: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        paranoid: true
    });
    post_1.default.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: sequelize_1.DataTypes.JSON,
            allowNull: false,
        },
        media: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        published: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        userId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        view: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        sequelize,
        modelName: 'Post',
        tableName: 'posts',
        paranoid: true
    });
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
    comment_1.default.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        content: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        postId: {
            type: sequelize_1.DataTypes.UUID,
            references: {
                model: 'posts',
                key: 'id'
            }
        },
        userId: {
            type: sequelize_1.DataTypes.UUID,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: "Comment",
        tableName: "comments",
        paranoid: true
    });
    // const PostTag = sequelize.define('PostTag', {
    //     id: {
    //         type: DataTypes.UUID,
    //         defaultValue: DataTypes.UUIDV4,
    //         primaryKey: true,
    //     },
    // }, { tableName: 'post_tags' });
    // Set up associations after both models are initialized
    user_1.default.hasMany(post_1.default, { foreignKey: 'userId', as: 'posts' });
    post_1.default.belongsTo(user_1.default, { foreignKey: 'userId', as: 'author' });
    post_1.default.hasMany(comment_1.default, { foreignKey: 'postId', as: 'comments' });
    comment_1.default.belongsTo(post_1.default, { foreignKey: 'postId' });
    user_1.default.hasMany(comment_1.default, { foreignKey: 'userId', as: 'comments' });
    comment_1.default.belongsTo(user_1.default, { foreignKey: 'userId', as: 'commenter' });
    // Post.belongsToMany(Tag, { through: 'PostTag', foreignKey: 'postId', as: 'tags' });
    // Tag.belongsToMany(Post, { through: 'PostTag', foreignKey: 'tagId', as: 'posts' });
    logger_1.default.info("Models initialized successfully");
});
exports.initializeModels = initializeModels;
