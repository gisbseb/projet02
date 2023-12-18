import { DataTypes } from "sequelize";
import sequelize from "../bdd/sequelize.js";
const Categorie = sequelize.define(
  "Categorie",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },

  { sequelize, modelName: "Categorie" }
);

export default Categorie;
