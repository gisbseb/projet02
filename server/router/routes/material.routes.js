import express from "express";
import materialController from "../../controllers/material.controller.js";
const router = express.Router();

router.get("/", materialController.getMaterials);
router.get("/count", materialController.getMostUsedMaterial);
export default router;
