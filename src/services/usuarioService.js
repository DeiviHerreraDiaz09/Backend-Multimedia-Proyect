import { conexionBD } from "../config/conexion.js";
import { encriptarClave } from "../helper/encriptacion.js";
import { enviarCorreo } from "./emailServide.js";
export const obtenerUsuariosServicio = async () => {
  const conexion = await conexionBD();
  const [usuarios, campos] = await conexion.query("SELECT * FROM usuario");
  conexion.release();
  return usuarios;
};

export const obtenerUsuarioServicio = async (id) => {
  const conexion = await conexionBD();
  const [resultado] = await conexion.query(
    "SELECT * FROM usuario WHERE id = ?",
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
  try {
    const conexion = await conexionBD();
    const clave = await encriptarClave("12345");

    const [resultado, campos] = await conexion.execute(
      "INSERT INTO usuario (nombre, apellido, correo, clave, rol) VALUES (?,?,?,?,?)",
      [usuario.nombre, usuario.apellido, usuario.correo, clave, usuario.rol]
    );
    const idUsuarioInsertado = resultado.insertId;

    const [datosUsuario] = await conexion.execute(
      "SELECT * FROM usuario WHERE id = ?",
      [idUsuarioInsertado]
    );

    const opcionesEmail = {
      from: "PONER CORREO",
      to: usuario.correo,
      subject: "Usuario creado 🆕",
      template: "newUser",
      context: {
        nombre: usuario.nombre,
        correo: usuario.correo,
      }
    };

    enviarCorreo(opcionesEmail);

    conexion.release();

    return datosUsuario.length ? datosUsuario[0] : null;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};

export const actualizarUsuarioServicio = async (usuarioUpdate, id) => {
  const conexion = await conexionBD();
  const [resultado] = await conexion.query(
    "UPDATE usuario SET ? WHERE id = ?",
    [usuarioUpdate, id]
  );
  const usuarioActualizado = await obtenerUsuarioServicio(id);
  conexion.release();
  return usuarioActualizado;
};

export const obtenerClientesServicio = async () => {
  const conexion = await conexionBD();
  const [clientes, campos] = await conexion.execute(
    "SELECT id,nombre,apellido,correo FROM usuario WHERE rol=?",
    ["Cliente"]
  );
  conexion.release();
  return clientes;
};
