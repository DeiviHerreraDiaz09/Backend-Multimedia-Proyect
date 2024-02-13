import { Router } from "express";
import {listarSolicitudes, listarSolicitud, registrarSolicitud, actualizarSolicitud} from "../controller/solicitudController.js";
const router = Router();

// Apartado solicitud

router.get("/", listarSolicitudes);
router.get("/:id", listarSolicitud);
router.post("/", registrarSolicitud);
router.patch("/:id", actualizarSolicitud);

export default router;
