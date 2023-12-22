import express from "express";
import materialController from "../../controllers/material.controller.js";
import { verifyJwt } from "../../middlewares/verifyJwt.js";
const router = express.Router();

router.get("/", materialController.getMaterials);
router.get("/count", verifyJwt, materialController.getMostUsedMaterial);
router.post("/", verifyJwt, materialController.addMaterials);
router.get("/:id", materialController.getFurnituresByMaterial);
router.patch("/", materialController.updateMaterial);
export default router;
