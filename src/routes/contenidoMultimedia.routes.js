import { Router } from "express";
import {
  registrarContenido,
  listarBanners,
} from "../controller/contenidoMultimediaController.js";
import { guardarArchivoAlCargar } from "../middleware/cargarArchivo.js"

const router = Router();

router.get("/", listarBanners);
router.post("/", guardarArchivoAlCargar, registrarContenido);

export default router;