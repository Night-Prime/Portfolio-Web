import { configDotenv } from "dotenv";
import { Pool, PoolConfig } from "pg";
import { Sequelize, Options as SequelizeOptions } from "sequelize";
import logger from "../utils/logger";
import { SequelizeStorage, Umzug } from "umzug";
import { initializeModels } from "../models";

configDotenv();

interface DbEnv {
    DB_USER: string;
    DB_HOST: string;
    DB_NAME: string;
    DB_PASS: string;
    DB_PORT: string;
}

// Function to validate environment variables
const validateEnv = (): DbEnv => {
    const requiredEnvVars: (keyof DbEnv)[] = ['DB_USER', 'DB_HOST', 'DB_NAME', 'DB_PASS', 'DB_PORT'];
    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

    if (missingEnvVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    }

    return {
        DB_USER: process.env.DB_USER!,
        DB_HOST: process.env.DB_HOST!,
        DB_NAME: process.env.DB_NAME!,
        DB_PASS: process.env.DB_PASS!,
        DB_PORT: process.env.DB_PORT!
    };
};

const createPoolConfig = (env: DbEnv): PoolConfig => ({
    user: env.DB_USER,
    host: env.DB_HOST,
    database: env.DB_NAME,
    password: env.DB_PASS,
    port: parseInt(env.DB_PORT, 4000),
});

// Function to create Sequelize configuration
const createSequelizeConfig = (env: DbEnv): SequelizeOptions => ({
    host: env.DB_HOST,
    dialect: 'postgres',
    logging: (msg) => logger.debug(msg),
});

// Now, initiaizing Database
export const initializeDatabase = async (): Promise<Sequelize> => {
    try {
        const env = validateEnv();
        logger.info("Wanna see? : ", env);

        const sequelizeConfig = createSequelizeConfig(env);

        const sequelize = new Sequelize(
            env.DB_NAME,
            env.DB_USER,
            env.DB_PASS,
            sequelizeConfig
        );
        // this handles my migration
        const umzug = new Umzug({
            migrations: { glob: 'src/migrations/*.ts' },
            context: sequelize.getQueryInterface(),
            storage: new SequelizeStorage({ sequelize }),
            logger: console
        });

        // Run migrations
        await umzug.up();
        logger.info('Migrations have successfully run');

        return sequelize;
    } catch (error) {
        logger.error('Failed to initialize database or run migrations:', error);
        process.exit(1);
    }

}

let sequelizeInstance: Sequelize | null = null;

export const getSequelizeInstance = async (): Promise<Sequelize> => {
    if (!sequelizeInstance) {
        sequelizeInstance = await initializeDatabase();
    }
    return sequelizeInstance;
};


