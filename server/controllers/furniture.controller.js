import { Sequelize } from "sequelize";
import sequelize from "../bdd/sequelize.js";
import Categorie from "../models/Categorie.js";
import Furniture from "../models/Furniture.js";

import FurnitureMaterial from "../models/FurnitureMaterial.js";
import Material from "../models/material.js";

const getFurnitures = async (req, res) => {
  const furnitures = await Furniture.findAll({
    include: [
      {
        model: Categorie,
      },
      {
        model: Material,
      },
    ],
  });
  res.status(200).json(furnitures);
};

const createFurniture = async (req, res) => {
  try {
    const { name, materials, category } = req.body;

    if (!name || !materials.length > 0 || !category) {
      return res
        .status(400)
        .json({ message: "Informations manquante", className: "error" });
    }

    const foundFurniture = await Furniture.findOne({ where: { name: name } });

    if (foundFurniture) {
      return res
        .status(400)
        .json({ message: "Le meuble existe déja", className: "error" });
    }

    const result = await sequelize.transaction(async (t) => {
      const newFurniture = await Furniture.create(
        {
          name: name,
          creationCount: 1,
          categorieId: parseInt(category),
        },
        { transaction: t }
      );
      for (const { id: materialId, quantity } of materials) {
        const foundMaterial = await Material.findByPk(materialId, {
          transaction: t,
        });

        if (foundMaterial && foundMaterial.stock >= quantity) {
          await Material.update(
            { stock: foundMaterial.stock - quantity },
            {
              where: { id: materialId },
              transaction: t,
            }
          );

          await FurnitureMaterial.create(
            {
              furnitureId: newFurniture.id,
              materialId: materialId,
              materialCount: quantity,
            },
            { transaction: t }
          );
        } else {
          throw new Error(`Plus de stock ${materialId}`);
        }
      }
    });

    return res
      .status(200)
      .json({ message: `${name} ajouté`, className: "success" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Une erreur est survenue", className: "error" });
  }
};

const incrementFurniture = async (req, res) => {
  const { id } = req.body;

  try {
    const foundFurniture = await Furniture.findByPk(id);

    if (!foundFurniture) {
      return res
        .status(403)
        .json({ message: "Meuble introuvable", className: "error" });
    }

    await sequelize.transaction(async (t) => {
      await foundFurniture.update(
        { creationCount: foundFurniture.creationCount + 1 },
        { transaction: t }
      );

      const materials = await foundFurniture.getMaterials();

      for (const material of materials) {
        const newStock =
          material.stock - material.Furniture_Material.materialCount;

        if (newStock >= 0) {
          await material.update({ stock: newStock }, { transaction: t });
        } else {
          throw new Error(`Matériel manquant: ${material.name}`);
        }
      }
    });

    res
      .status(200)
      .json({ message: `${foundFurniture.name} ajouté`, className: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", className: "error" });
  }
};

const getFurnitureByCat = async (req, res) => {
  try {
    const furnituresByCat = await Furniture.findAll({
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("Categorie.id")), "count"],
        [sequelize.literal("MAX(`Categorie`.`name`)"), "name"],
      ],
      include: [
        {
          model: Categorie,
          attributes: [],
        },
      ],
      group: ["Categorie.id"],
    });

    return res.status(200).json(furnituresByCat);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "erreur serveur", err });
  }
};
export default {
  getFurnitures,
  createFurniture,
  incrementFurniture,
  getFurnitureByCat,
};
