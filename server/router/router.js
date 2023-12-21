import express from "express";

import company_routes from "./routes/company.routes.js";
import material_routes from "./routes/material.routes.js";
import furniture_routes from "./routes/furniture.routes.js";
import categorie_routes from "./routes/categorie.routes.js";
import auth_routes from "./routes/auth.routes.js";
const router = express.Router();

router.use("/company", company_routes);
router.use("/categorie", categorie_routes);
router.use("/material", material_routes);
router.use("/furniture", furniture_routes);
router.use("/auth", auth_routes);

export default router;
