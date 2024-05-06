import { Router } from "express";
import {
  listarRespuestas,
  listarRespuesta,
  registrarRepuesta,
  actualizarRespuesta
} from "../controller/respuestaController.js";
const router = Router();

// Apartado Respuesta

router.get("/", listarRespuestas);
router.get("/:id", listarRespuesta);
router.post("/", registrarRepuesta);
router.patch("/:id", actualizarRespuesta);

export default router;
