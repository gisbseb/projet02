import express from "express";
import furnitureController from "../../controllers/furniture.controller.js";
const router = express.Router();

router.get("/", furnitureController.getFurnitures);
router.post("/", furnitureController.createFurniture);
router.post("/increment", furnitureController.incrementFurniture);
router.get("/categorie", furnitureController.getFurnitureByCat);

export default router;
