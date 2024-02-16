import { Router } from "express";
import { registrarBanner } from "../controller/bannerController.js";
import { guardarArchivoAlCargar } from "../middleware/cargarArchivo.js";

const router = Router();

// Apartado empresa

// router.get("/", listarEtiquetas);
// router.get("/:id", listarEmpresa);
router.post("/", guardarArchivoAlCargar,registrarBanner);
// router.patch("/:id", actualizarEmpresa);

export default router;
