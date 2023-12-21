import { Sequelize, Op } from "sequelize";
import sequelize from "../bdd/sequelize.js";
import Categorie from "../models/Categorie.js";
import Furniture from "../models/Furniture.js";

import FurnitureMaterial from "../models/FurnitureMaterial.js";
import Material from "../models/material.js";
import { join } from "node:path";
import fs from "fs";
const imagesPath = join(process.cwd(), "public", "images");
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
  if (!req.files) {
    return res
      .status(400)
      .json({ message: "Informations manquante", className: "error" });
  }

  const { name, category } = req.body;
  const { image } = req.files;
  const materials = JSON.parse(req.body.materials);
  image.name = "img" + name;
  try {
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
          filename: image.name,
        },
        { transaction: t }
      );

      for (const { id: materialId, quantity } of materials) {
        console.log(materialId, quantity);
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
      try {
        image.mv(join(imagesPath, image.name), (error) => {
          if (error) {
            console.error(error);
          } else {
            console.log("file ok");
          }
        });
      } catch (error) {
        console.error(error);
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

const deleteFurniture = async (req, res) => {
  const { id } = req.params;

  console.log(id);

  try {
    const foundFurniture = await Furniture.findByPk(parseInt(id));

    if (!foundFurniture) {
      return res
        .status(400)
        .json({ message: "Meuble introuvable", className: "error" });
    }
    await foundFurniture.destroy();
    return res.status(200).json({
      message: `${foundFurniture.name} supprimer`,
      className: "success",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Erreur serveur", className: "error" });
  }
};

const updateFurniture = async (req, res) => {
  const { id } = req.params;
  const { categorie, name } = req.body;

  try {
    const isNameTaken = await Furniture.findOne({
      where: {
        name: name,
        id: {
          [Op.ne]: id,
        },
      },
    });

    if (isNameTaken) {
      return res
        .status(400)
        .json({ message: "Le nom est déja pris", className: "error" });
    }
    const foundFurniture = await Furniture.findByPk(id);

    foundFurniture.name = name;
    foundFurniture.categorieId = parseInt(categorie);

    if (
      req.files &&
      req.files.image &&
      foundFurniture.filename != req.files?.image?.name
    ) {
      console.log("ici on modifie les fichiers");
      const oldFileName = foundFurniture.filename;
      req.files.image.name = "img" + name;
      foundFurniture.filename = "img" + name;

      try {
        if (oldFileName) {
          const oldFilePath = join(imagesPath, oldFileName);
          fs.unlinkSync(oldFilePath);
          console.log("delete old file");
        }

        await req.files.image.mv(
          join(imagesPath, req.files.image.name),
          (error) => {
            if (error) {
              console.error(error);
            } else {
              console.log("new file ok");
            }
          }
        );
      } catch (error) {
        console.error(error);
      }
    }

    foundFurniture.save();
    return res
      .status(200)
      .json({ message: "Meuble modifié", className: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur", className: "error" });
  }
};

export default {
  getFurnitures,
  createFurniture,
  incrementFurniture,
  getFurnitureByCat,
  deleteFurniture,
  updateFurniture,
};
