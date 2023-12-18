import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const { DB_NAME, DB_PORT, DB_USER, DB_PWD, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PWD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
});

export default sequelize;
