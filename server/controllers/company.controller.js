import Company from "../models/Company.js";

const getCompanies = async (req, res) => {
  const companies = await Company.findAll();
  res.status(200).json(companies);
};

export default {
  getCompanies,
};
