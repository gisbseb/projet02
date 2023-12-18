import { DataTypes } from "sequelize";
import sequelize from "../bdd/sequelize.js";
const Company = sequelize.define(
  "Company",
  {
    socialReason: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },

  { sequelize, modelName: "Company" }
);

export default Company;
