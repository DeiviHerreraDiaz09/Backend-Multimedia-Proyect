import { Router } from "express";
import {
  listarSoliRespuestaByRespuesta,
  listarSoliRespuestas,
  listarSoliRespuestaBySolicitud,
} from "../controller/solicitudes_RespuestasController.js";
const router = Router();

// Apartado Solicitudes + Respuestas

router.get("/", listarSoliRespuestas);
router.get("/listarsolicitud/:id", listarSoliRespuestaBySolicitud);
router.get("/listarRespuesta/:id", listarSoliRespuestaByRespuesta);

router.post("/"); // TODAVIA NO
router.patch("/:id"); // TODAVIA NO

export default router;
