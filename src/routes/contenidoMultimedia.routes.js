import { Router } from "express";
import { autenticacion } from "../middleware/auth.js";
import { crearContenidoMultimedia, formularioMultimediaContenido, obtenerArchivo } from "../controller/contenidoMultimediaController.js";
import { cargarArchivo } from "../middleware/archivos.js";
const router = Router();

router.get('/listarContenido', formularioMultimediaContenido)
router.get('/archivo/:archivo', obtenerArchivo)
router.get('/formularioContenidoMultimedia', formularioMultimediaContenido)
router.post('/formularioContenidoMultimedia', cargarArchivo, crearContenidoMultimedia)
// router.post('/sol', registrarUsuarios)
// router.post('/login',login)

export default router;
