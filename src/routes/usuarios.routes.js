import { Router } from "express";
import {
  listarUsuarios,
  listarUsuario,
  registrarUsuarios,
  userInfo,
  login,
} from "../controller/usuarios.controller.js";
const router = Router();

// Apartado usuarios
router.get("/usuarios", listarUsuarios);
router.get("/usuario/:id", listarUsuario);
router.post("/userInfoToken", userInfo);
router.post("/usuarios", registrarUsuarios);
router.post("/login", login);

export default router;
