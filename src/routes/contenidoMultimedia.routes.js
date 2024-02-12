import { Router } from "express";
import { autenticacion } from "../middleware/auth.js";
import { formularioMultimediaContenido } from "../controller/contenidoMultimediaController.js";
const router = Router();

router.get("/listarContenido", formularioMultimediaContenido);
router.get("/formularioContenidoMultimedia", formularioMultimediaContenido);

export default router;
