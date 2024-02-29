import { Router } from "express";
import { listarPaquetes, paqueteId, registrarPaquete } from "../controller/paqueteController.js";

const router = Router();

router.get("/", listarPaquetes);
router.get("/:id", paqueteId);
router.post("/", registrarPaquete);

export default router;