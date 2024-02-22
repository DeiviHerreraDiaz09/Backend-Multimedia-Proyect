import { conexionBD } from "../config/conexion.js";
import { encriptarClave } from "../helper/encriptacion.js";
import { obtenerFechaActual, sumarFechaActual } from "../helper/fechas.js";
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
      from: "aospina@grupoasd.com",
      to: usuario.correo,
      subject: "Usuario creado 🆕",
      template: "AlertPaquete",
      context: {
        nombre: usuario.nombre,
        correo: usuario.correo,
      },
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

export const usuarioAdquierePaquete = async (paquete) => {
  const conexion = await conexionBD();
  const fechaActual = obtenerFechaActual();
  const fechaFinalizacion = sumarFechaActual(paquete.diasVigencia);
  const [resultado] = await conexion.execute(
    "INSERT INTO usuario_paquete(fecha_inicio, fecha_finalizacion, usuario_fk, paquete_fk) VALUES (?,?,?,?)",
    [fechaActual, fechaFinalizacion, paquete.usuario, paquete.id]
  );
  conexion.release();
  return resultado;
};

export const consultarPaqueteUsuario = async (id) => {
  const conexion = await conexionBD();
  const [resultado] = await conexion.execute("SELECT paquete.id, paquete.nombre, paquete.descripcion, paquete.limite_canciones, paquete.numero_publicidad, paquete.dias_vigencia, usuario_paquete.fecha_inicio, usuario_paquete.fecha_finalizacion FROM paquete INNER JOIN usuario_paquete ON usuario_paquete.paquete_fk = paquete.id INNER JOIN usuario ON usuario.id = usuario_paquete.usuario_fk WHERE usuario.id = ?",
    [id]);
  conexion.release();
  return resultado[0];
};
