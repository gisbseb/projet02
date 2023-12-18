import { DataTypes } from "sequelize";
import sequelize from "../bdd/sequelize.js";
import Company from "./Company.js";
const Material = sequelize.define(
  "Material",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
  },

  { sequelize, modelName: "Material" }
);

Material.belongsTo(Company, { foreignKey: "companyId" });

export default Material;
