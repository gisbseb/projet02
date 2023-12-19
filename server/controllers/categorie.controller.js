import sequelize from "../bdd/sequelize.js";
import Categorie from "../models/Categorie.js";
import Furniture from "../models/Furniture.js";

const getCategories = async (req, res) => {
  const categories = await Categorie.findAll();
  res.status(200).json(categories);
};

export default {
  getCategories,
};
