import createHttpError from "http-errors";
import { conexionBD } from "../config/conexion.js";
import { encriptarClave, verificarClave } from "../helper/encriptacion.js";

export const obtenerUsuarioServicio = async () => {
  const conexion = await conexionBD();
  const [usuarios, campos] = await conexion.query("SELECT * FROM usuarios");
  conexion.release();
  return usuarios;
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

export const crearUsuarioServicio = async (usuario) => {
  const conexion = await conexionBD();
  console.log(usuario);
  const clave = await encriptarClave("12345");
  const [resultado, campos] = await conexion.execute(
    "INSERT INTO usuarios (nombre, apellido, correo, clave, rol) VALUES (?,?,?,?,?)",
    [usuario.nombre, usuario.apellido, usuario.correo, clave, usuario.rol]
  );
  conexion.release();
  return resultado;
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
