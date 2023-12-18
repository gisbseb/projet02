import Categorie from "../models/Categorie.js";

const getCategories = async (req, res) => {
  const categories = await Categorie.findAll();
  res.status(200).json(categories);
};

export default {
  getCategories,
};
