import express from "express";
import authController from "../../controllers/auth.controller.js";
const router = express.Router();

router.post("/", authController.login);
router.get("/logout", authController.logout);
export default router;
