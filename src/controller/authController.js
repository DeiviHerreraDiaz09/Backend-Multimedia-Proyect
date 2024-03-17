import jwt from "jsonwebtoken";
import {
  loginServicio,
  clean_token,
  extractUserByToken,
} from "../services/authService.js";

import dotenv from "dotenv";

dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;

export const login = async (req, res) => {
  const { correo, clave } = req.body;
  try {
    const [usuario] = await loginServicio(correo, clave);

    const payload = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
    };

    const token = jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1800s" });

    res.json({
      token_type: "Bearer",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Hubo un problema",
    });
  }
};

export const userInfo = async (req, res) => {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) {
    return res.json({ msg: "No se proporcionó el encabezado de autorización" });
  }
  const cleanToken = await clean_token(authorizationHeader);
  const usuario = await extractUserByToken(cleanToken);
  return res.json(usuario);
};
