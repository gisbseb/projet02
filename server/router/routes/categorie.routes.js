import express from "express";
import categorieController from "../../controllers/categorie.controller.js";
const router = express.Router();

router.get("/", categorieController.getCategories);

export default router;
