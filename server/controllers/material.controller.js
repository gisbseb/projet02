import Material from "../models/material.js";

const getMaterials = async (req, res) => {
  const materials = await Material.findAll();
  res.status(200).json(materials);
};

export default {
  getMaterials,
};
