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
      return res.status(400).json({ message: "Informations manquante" });
    }

    const foundFurniture = await Furniture.findOne({ where: { name: name } });

    if (foundFurniture) {
      return res.status(400).json({ message: "Le meuble existe déja" });
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
            },
            { transaction: t }
          );
        } else {
          throw new Error(
            `No stock available for Material with id ${materialId}`
          );
        }
      }
    });

    return res.status(200).json({ message: "Meuble ajouter" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur est survenue" });
  }
};

export default {
  getFurnitures,
  createFurniture,
};
