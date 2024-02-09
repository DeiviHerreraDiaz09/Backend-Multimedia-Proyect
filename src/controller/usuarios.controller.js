import {
  obtenerUsuarioServicio,
  crearUsuarioServicio,
  loginServicio,
} from "../services/usuariosservicio.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await obtenerUsuarioServicio();
    res.json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
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
      msg: "Success LogIn",
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      error: "Hubo un problema",
    });
  }
};
