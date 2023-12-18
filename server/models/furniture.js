import { DataTypes } from "sequelize";
import sequelize from "../bdd/sequelize.js";
import Categorie from "./Categorie.js";
const Furniture = sequelize.define(
  "Furniture",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    creationCount: {
      type: DataTypes.INTEGER,
    },
  },

  { sequelize, modelName: "Furniture" }
);
Furniture.belongsTo(Categorie, { foreignKey: "categorieId" });
export default Furniture;
