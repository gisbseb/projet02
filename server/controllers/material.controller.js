import sequelize from "../bdd/sequelize.js";
import Furniture from "../models/Furniture.js";
import FurnitureMaterial from "../models/FurnitureMaterial.js";
import Material from "../models/material.js";

const getMaterials = async (req, res) => {
  const materials = await Material.findAll();
  res.status(200).json(materials);
};

const getMostUsedMaterial = async (req, res) => {
  try {
    // const materials = await FurnitureMaterial.findAll();

    const materials = await Material.findAll({
      attributes: [
        "name",
        [
          sequelize.fn("SUM", sequelize.col("Furniture.creationCount")),
          "usage",
        ],
      ],
      include: [
        {
          model: Furniture,
          as: "Furniture",
          attributes: [],
        },
      ],
      group: ["name"],
    });

    // console.log(result);
    res.status(200).json(materials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  getMaterials,
  getMostUsedMaterial,
};
