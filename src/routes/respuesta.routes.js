import { Router } from "express";
import { listarRespuestas } from "../controller/respuestaController.js";
const router = Router();

// Apartado Respuesta

router.get("/", listarRespuestas);
router.get("/:id");
router.post("/");
router.patch("/:id");

export default router;
