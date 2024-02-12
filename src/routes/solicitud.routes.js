import { Router } from "express";
import { autenticacion } from "../middleware/auth.js";
import {
  formularioSolicitud,
  registroSolicitud,
} from "../controller/solicitudController.js";
const router = Router();

router.get("/formularioSolicitud", formularioSolicitud);
router.post("/crearSolicitud", registroSolicitud);

export default router;
