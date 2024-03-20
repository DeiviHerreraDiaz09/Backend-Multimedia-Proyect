import { Router } from "express";
import {
  registrarContenido,
  listarBanners,
} from "../controller/contenidoMultimediaController.js";

const router = Router();

router.get("/", listarBanners);
router.post("/", registrarContenido);

export default router;
