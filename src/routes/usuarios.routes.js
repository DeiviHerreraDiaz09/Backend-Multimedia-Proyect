import { Router } from "express";
import { formularioUsuario, listarUsuarios, login, registrarUsuarios } from "../controller/usuarios.controller.js";
import { autenticacion } from "../middleware/auth.js";
const router = Router();

// Apartado usuarios
router.get('/usuarios',autenticacion, listarUsuarios)
router.get('/formularioUsuario', formularioUsuario)
router.post('/usuarios', registrarUsuarios)
router.post('/login',login)

export default router;
