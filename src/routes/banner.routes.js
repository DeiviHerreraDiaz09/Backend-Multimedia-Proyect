import { Router } from "express";
import { registrarBanner } from "../controller/bannerController.js";

const router = Router();

// Apartado empresa

// router.get("/", listarEtiquetas);
// router.get("/:id", listarEmpresa);
router.post("/", registrarBanner);
// router.patch("/:id", actualizarEmpresa);

export default router;
