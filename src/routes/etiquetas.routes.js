import { Router } from "express";
import { listarEtiquetas } from "../controller/etiquetaController.js";

const router = Router();

// Apartado empresa

router.get("/", listarEtiquetas);
// router.get("/:id", listarEmpresa);
// router.post("/", registrarEmpresa);
// router.patch("/:id", actualizarEmpresa);

export default router;
