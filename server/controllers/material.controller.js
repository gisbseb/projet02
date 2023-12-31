import sequelize from "../bdd/sequelize.js";
import Categorie from "../models/Categorie.js";
import Furniture from "../models/Furniture.js";
import FurnitureMaterial from "../models/FurnitureMaterial.js";
import Material from "../models/material.js";

const getMaterials = async (req, res) => {
  const materials = await Material.findAll();
  res.status(200).json(materials);
};

const addMaterials = async (req, res) => {
  const { materialId, count } = req.body;

  if (!materialId || parseInt(count) < 1) {
    return res
      .status(400)
      .json({ message: "informations invalide", className: "error" });
  }

  try {
    const foundMaterial = await Material.findByPk(materialId);
    await Material.update(
      { stock: foundMaterial.stock + parseInt(count) },
      {
        where: { id: materialId },
      }
    );
    res.status(200).json({
      message: `${count} ${foundMaterial.name} ajouté`,
      className: "success",
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", className: "error" });
  }
};

const getMostUsedMaterial = async (req, res) => {
  try {
    const materials = await Material.findAll({
      attributes: ["name"],
      include: [
        {
          model: Furniture,
          as: "Furniture",
          attributes: ["creationCount"],
        },
      ],
      group: ["Material.id", "Furniture.id"],
    });

    const data = materials.map((material) => {
      const name = material.name;
      const usage = material.Furniture.reduce((total, el) => {
        return (
          total +
          parseInt(el.creationCount) *
            parseInt(el.Furniture_Material.materialCount)
        );
      }, 0);

      return { name, usage };
    });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "seveur err" });
  }
};
const getFurnituresByMaterial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!parseInt(id)) {
      return res.status(400).json({ error: "erreur" });
    }
    const material = await Material.findByPk(id, {
      include: [
        {
          model: Furniture,

          include: [
            {
              model: Categorie,
            },
            {
              model: Material,
            },
          ],
        },
      ],
    });

    if (!material) {
      return res.status(404).json({ error: "materiaux introuvable." });
    }

    res.status(200).json(material);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "seveur err" });
  }
};

const updateMaterial = async (req, res) => {
  const { description, materialId: id } = req.body;

  if (!description || !id) {
    return res
      .status(400)
      .json({ message: "Informations manquante", className: "error" });
  }

  try {
    const foundMaterial = await Material.findByPk(parseInt(id));
    if (!foundMaterial) {
      return res
        .status(400)
        .json({ message: "Ressource introuvable", className: "error" });
    }

    foundMaterial.description = description;
    foundMaterial.save();

    return res.status(200).json({
      message: `${foundMaterial.name} mis à jour`,
      className: "success",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erreur serveur", className: "error" });
  }
};
export default {
  getMaterials,
  addMaterials,
  getMostUsedMaterial,
  getFurnituresByMaterial,
  updateMaterial,
};
