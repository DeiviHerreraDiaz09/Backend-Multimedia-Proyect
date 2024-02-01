import { Router } from "express";
import { autenticacion } from "../middleware/auth.js";
import { formularioSolicitud } from "../controller/solicitudController.js";
const router = Router();

router.get('/formularioSolicitud', formularioSolicitud)
// router.post('/sol', registrarUsuarios)
// router.post('/login',login)

export default router;
