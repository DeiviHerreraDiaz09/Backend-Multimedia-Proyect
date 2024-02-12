import { conexionBD } from "../config/conexion.js";
import { obtenerUsuarioServicio } from "../services/usuarioService.js";
import { verificarClave } from "../helper/encriptacion.js";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

export const loginServicio = async (correo, clavePlana) => {
  const conexion = await conexionBD();
  const [usuario, campos] = await conexion.execute(
    "SELECT * FROM usuario WHERE correo=?",
    [correo]
  );
  conexion.release();
  if (usuario == [] || usuario.length == 0) {
    throw createHttpError(404, "El usuario no existe");
  }
  const [{ clave }] = usuario;
  if (!(await verificarClave(clavePlana, clave))) {
    throw createHttpError(400, "Usuario o contraseña Invalidos");
  }
  return usuario;
};

export const clean_token = async (token) => {
  const parts = token.split(" ");
  return parts[parts.length - 1];
};

export const extractUserByToken = async (token) => {
  try {
    const decodificar = jwt.decode(token, TOKEN_SECRET);
    const id = decodificar["id"];
    const verificar = await obtenerUsuarioServicio(id);
    if (!verificar) {
      return console.log("Verificación incorrecta");
    }
    return verificar;
  } catch (error) {
    console.log(error);
  }
};
