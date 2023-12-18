import Furniture from "../models/Furniture.js";

const getFurnitures = async (req, res) => {
  const furnitures = await Furniture.findAll();
  res.status(200).json(furnitures);
};

export default {
  getFurnitures,
};
