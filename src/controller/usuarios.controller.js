import {
  obtenerUsuariosServicio,
  obtenerUsuarioServicio,
  clean_token,
  crearUsuarioServicio,
  extractUserByToken,
  loginServicio,
} from "../services/usuariosservicio.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await obtenerUsuariosServicio();
    res.json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

export const listarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await obtenerUsuarioServicio(id);
    console.log(usuario);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const registrarUsuarios = async (req, res) => {
  const { nombre, apellido, correo, rol } = req.body;
  try {
    const created = await crearUsuarioServicio({
      nombre,
      apellido,
      correo,
      rol,
    });
    res.json({
      msg: "Success",
      data: created,
    });
  } catch (error) {
    console.log(error);
  }
};

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
    res.status(400).json({
      error: "Hubo un problema",
    });
  }
};

// Login Validación

export const userInfo = async (req, res) => {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) {
    return res.json({ msg: "No se proporcionó el encabezado de autorización" });
  }
  const cleanToken = await clean_token(authorizationHeader);
  const usuario = await extractUserByToken(cleanToken);
  return res.json(usuario);
};
