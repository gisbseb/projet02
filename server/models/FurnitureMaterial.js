import { DataTypes } from "sequelize";
import sequelize from "../bdd/sequelize.js";
import Furniture from "./Furniture.js";
import Material from "./material.js";

const FurnitureMaterial = sequelize.define(
  "Furniture_Material",
  {
    materialCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "Furniture_Material",
  }
);

Material.belongsToMany(Furniture, {
  through: FurnitureMaterial,
  foreignKey: "materialId",
});
Furniture.belongsToMany(Material, {
  through: FurnitureMaterial,
  foreignKey: "furnitureId",
});

export default FurnitureMaterial;
