import express from "express";
import furnitureController from "../../controllers/furniture.controller.js";
const router = express.Router();

router.get("/", furnitureController.getFurnitures);
export default router;
