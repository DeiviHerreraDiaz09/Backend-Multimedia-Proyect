import { Router } from "express";
import {
  listarUsuarios,
  listarUsuario,
  registrarUsuarios,
  actualizarUsuario,
  adquirirPaqueteUsuario,
  paqueteUsuario,
  avatarUsuario,
  mostrarAvatar,
  mostrarAvatarPorUsuario,
  actualizarEstadoUsuario,
} from "../controller/usuarioController.js";
import { cambiarClaveUsuario } from "../services/usuarioService.js";
import { guardarAvatarAlCargar } from "../middleware/cargarArchivo.js";
const router = Router();

// Apartado usuarios

router.get("/", listarUsuarios);
router.get("/:id", listarUsuario);
router.get("/:id/paquete", paqueteUsuario);
router.post("/", registrarUsuarios);
router.patch("/:id", actualizarUsuario);
router.post("/paquete", adquirirPaqueteUsuario);
router.patch("/:id/cambiar-clave", cambiarClaveUsuario);
router.put("/:id/avatar", guardarAvatarAlCargar, avatarUsuario);
router.get("/:id/avatar", mostrarAvatar);
router.get("/:id/avatarUsuario", mostrarAvatarPorUsuario);
router.put("/:id/estado", actualizarEstadoUsuario);

export default router;
