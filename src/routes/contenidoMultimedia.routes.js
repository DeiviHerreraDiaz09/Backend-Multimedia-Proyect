import { Router } from "express";
import {
  registrarContenido,
  listarContenidoMultimedia,
} from "../controller/contenidoMultimediaController.js";
import { guardarArchivoAlCargar } from "../middleware/cargarArchivo.js";

const router = Router();

router.get("/", listarContenidoMultimedia);
router.post("/", guardarArchivoAlCargar, registrarContenido);

export default router;
