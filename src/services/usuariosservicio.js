import createHttpError from "http-errors";
import { conexionBD } from "../config/conexion.js";
import { encriptarClave, verificarClave } from "../helper/encriptacion.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

export const obtenerUsuariosServicio = async () => {
  const conexion = await conexionBD();
  const [usuarios, campos] = await conexion.query("SELECT * FROM usuarios");
  conexion.release();
  return usuarios;
};

export const obtenerUsuarioServicio = async (id) => {
  const conexion = await conexionBD();
  const [resultado] = await conexion.query(
    "SELECT * FROM usuarios WHERE id = ?",
    [id]
  );
  conexion.release();

  if (resultado.length > 0) {
    return resultado[0];
  } else {
    return null;
  }
};

export const crearUsuarioServicio = async (usuario) => {
  const conexion = await conexionBD();
  console.log(usuario);
  const clave = await encriptarClave("12345");

  const [resultado, campos] = await conexion.execute(
    "INSERT INTO usuarios (nombre, apellido, correo, clave, rol) VALUES (?,?,?,?,?)",
    [usuario.nombre, usuario.apellido, usuario.correo, clave, usuario.rol]
  );

  const idUsuarioInsertado = resultado.insertId;

  const [datosUsuario] = await conexion.execute(
    "SELECT * FROM usuarios WHERE id = ?",
    [idUsuarioInsertado]
  );

  conexion.release();
  return datosUsuario.length ? datosUsuario[0] : null;
};

export const loginServicio = async (correo, clavePlana) => {
  const conexion = await conexionBD();
  const [usuario, campos] = await conexion.execute(
    "SELECT * FROM usuarios WHERE correo=?",
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

export const obtenerClientesServicio = async () => {
  const conexion = await conexionBD();
  const [clientes, campos] = await conexion.execute(
    "SELECT id,nombre,apellido,correo FROM usuarios WHERE rol=?",
    ["Cliente"]
  );
  conexion.release();
  return clientes;
};

// LOGIN

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
