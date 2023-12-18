import express from "express";
import dotenv from "dotenv";
import sequelize from "./bdd/sequelize.js";
import mysql from "mysql2/promise";
import Categorie from "./models/Categorie.js";

import populateDb from "./bdd/populateDb.js";
dotenv.config();

const app = express();
const { APP_PORT, APP_HOST, DB_NAME, DB_HOST, DB_PORT, DB_USER, DB_PWD } =
  process.env;
const mysqlConfig = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PWD,
};
async function createDatabase() {
  try {
    const connection = await mysql.createConnection(mysqlConfig);
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${DB_NAME};`);
    console.log(`Database '${DB_NAME}' created or already exists.`);
    await connection.end();
  } catch (error) {
    console.error("Error creating database:", error);
  }
}
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("DB Connection established");

    await sequelize.sync({ force: true });
    populateDb();
    console.log("Database synchronized");
  } catch (error) {
    if (
      error.name === "SequelizeConnectionError" &&
      error.parent.code === "ER_BAD_DB_ERROR"
    ) {
      console.log(`Creating the database '${DB_NAME}'...`);
      await createDatabase();
      console.log("Database created. Retrying connection...");

      await testConnection();
    } else {
      console.error("Unable to connect to the database:", error);
    }
  }
}
testConnection();
app.use("/", (req, res) => {
  res.send("super");
});

app.listen(APP_PORT, () => {
  console.log(`server starter: http://${APP_HOST}:${APP_PORT}`);
});
