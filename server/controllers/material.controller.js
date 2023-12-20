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
    return res.status(400).json({ message: "informations invalide" });
  }

  try {
    const foundMaterial = await Material.findByPk(materialId);
    await Material.update(
      { stock: foundMaterial.stock + parseInt(count) },
      {
        where: { id: materialId },
      }
    );
    res.status(200).json({ message: `${count} ${foundMaterial.name} ajouté` });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
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
    console.log(data);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getFurnituresByMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!parseInt(id)) {
      return res.status(400).json({ error: "Material ID is required." });
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
      return res.status(404).json({ error: "Material not found." });
    }

    res.status(200).json(material);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export default {
  getMaterials,
  addMaterials,
  getMostUsedMaterial,
  getFurnituresByMaterial,
};
