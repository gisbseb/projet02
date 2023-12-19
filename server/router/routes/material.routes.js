import express from "express";
import materialController from "../../controllers/material.controller.js";
const router = express.Router();

router.get("/", materialController.getMaterials);
router.get("/count", materialController.getMostUsedMaterial);
router.post("/", materialController.addMaterials);
router.get("/:id", materialController.getFurnituresByMaterial);
export default router;
