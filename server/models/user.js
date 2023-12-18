import { DataTypes } from "sequelize";
import sequelize from "../bdd/sequelize.js";
const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },

  { sequelize, modelName: "User" }
);

export default User;
