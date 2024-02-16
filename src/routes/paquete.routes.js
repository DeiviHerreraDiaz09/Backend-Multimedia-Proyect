import { Router } from "express";
import { registrarPaquete } from "../controller/paqueteController.js";

const router = Router();

router.post("/", registrarPaquete);

export default router;