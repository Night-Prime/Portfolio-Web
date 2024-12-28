"use strict";
require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
        // ca: fs
        //   .readFileSync(path.resolve(__dirname, "./certs/aiven-ca.pem"))
        //   .toString(),
      },
    },
  },
};

var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSequelizeInstance = exports.initializeDatabase = void 0;
const dotenv_1 = require("dotenv");
const sequelize_1 = require("sequelize");
const logger_1 = __importDefault(require("../utils/logger"));
const umzug_1 = require("umzug");
(0, dotenv_1.configDotenv)();
// Function to validate environment variables
const validateEnv = () => {
  const requiredEnvVars = [
    "DB_USER",
    "DB_HOST",
    "DB_NAME",
    "DB_PASS",
    "DB_PORT",
  ];
  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );
  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(", ")}`
    );
  }
  return {
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_PASS: process.env.DB_PASS,
    DB_PORT: process.env.DB_PORT,
  };
};
const createPoolConfig = (env) => ({
  user: env.DB_USER,
  host: env.DB_HOST,
  database: env.DB_NAME,
  password: env.DB_PASS,
  port: parseInt(env.DB_PORT, 10),
});
// Function to create Sequelize configuration
const createSequelizeConfig = (env) => ({
  host: env.DB_HOST,
  dialect: "postgres",
  logging: (msg) => logger_1.default.debug(msg),
});
// Now, initiaizing Database
const initializeDatabase = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const env = validateEnv();
      const sequelizeConfig = createSequelizeConfig(env);
      const sequelize = new sequelize_1.Sequelize(
        env.DB_NAME,
        env.DB_USER,
        env.DB_PASS,
        sequelizeConfig
      );
      // this handles my migration
      const umzug = new umzug_1.Umzug({
        migrations: { glob: "src/migrations/*.ts" },
        context: sequelize.getQueryInterface(),
        storage: new umzug_1.SequelizeStorage({ sequelize }),
        logger: console,
      });
      // Run migrations
      yield umzug.up();
      logger_1.default.info("Migrations have successfully run");
      return sequelize;
    } catch (error) {
      logger_1.default.error(
        "Failed to initialize database or run migrations:",
        error
      );
      process.exit(1);
    }
  });
exports.initializeDatabase = initializeDatabase;
let sequelizeInstance = null;
const getSequelizeInstance = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!sequelizeInstance) {
      sequelizeInstance = yield (0, exports.initializeDatabase)();
    }
    return sequelizeInstance;
  });
exports.getSequelizeInstance = getSequelizeInstance;
