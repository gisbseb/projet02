import express from "express";
import categorieController from "../../controllers/categorie.controller.js";
import { verifyJwt } from "../../middlewares/verifyJwt.js";
const router = express.Router();

router.get("/", verifyJwt, categorieController.getCategories);

export default router;
