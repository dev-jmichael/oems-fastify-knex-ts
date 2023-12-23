import { Knex } from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'development'

interface KnexConfig extends Knex.Config {
  connection: {
    server: string;
    user: string;
    password: string;
    database: string;
  };
}

const config: KnexConfig = {
    client: 'mssql',
    connection: {
      server: process.env.DB_SERVER as string,
      user: process.env.DB_USER as string,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_NAME as string,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './src/database/seeds',
    }
};

export default config;
