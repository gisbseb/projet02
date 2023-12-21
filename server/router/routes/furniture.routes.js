import express from "express";
import furnitureController from "../../controllers/furniture.controller.js";
import { verifyJwt } from "../../middlewares/verifyJwt.js";
import fileUpload from "express-fileupload";
const router = express.Router();

router.get("/", furnitureController.getFurnitures);
router.post("/", verifyJwt, fileUpload(), furnitureController.createFurniture);
router.post("/increment", verifyJwt, furnitureController.incrementFurniture);
router.get("/categorie", verifyJwt, furnitureController.getFurnitureByCat);

export default router;
