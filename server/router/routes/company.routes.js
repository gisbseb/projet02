import express from "express";
import companyController from "../../controllers/company.controller.js";
import { verifyJwt } from "../../middlewares/verifyJwt.js";
const router = express.Router();

router.get("/", verifyJwt, companyController.getCompanies);
export default router;
