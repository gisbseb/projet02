import express from "express";
import materialController from "../../controllers/material.controller.js";
const router = express.Router();

router.get("/", materialController.getMaterials);
export default router;
