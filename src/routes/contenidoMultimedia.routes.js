import { Router } from "express";
import { autenticacion } from "../middleware/auth.js";
import { formularioMultimediaContenido } from "../controller/contenidoMultimediaController.js";
const router = Router();

router.get('/listarContenido', formularioMultimediaContenido)
router.get('/formularioContenidoMultimedia', formularioMultimediaContenido)
// router.post('/sol', registrarUsuarios)
// router.post('/login',login)

export default router;
