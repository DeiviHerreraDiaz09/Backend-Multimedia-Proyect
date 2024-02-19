import { Router } from "express";
import { listarPaquetes, registrarPaquete } from "../controller/paqueteController.js";

const router = Router();

router.get("/", listarPaquetes);
router.post("/", registrarPaquete);

export default router;