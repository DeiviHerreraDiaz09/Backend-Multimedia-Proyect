import { conexionBD } from "../config/conexion.js";
import { encriptarClave, verificarClave } from "../helper/encriptacion.js";
import { obtenerFechaActual, sumarFechaActual } from "../helper/fechas.js";
import { enviarCorreo } from "./emailServide.js";
export const obtenerUsuariosServicio = async (filters = {}) => {
  const conexion = await conexionBD();
  let query = "SELECT * FROM usuario";

  // Verificar si se proporcionaron filtros
  const filterKeys = Object.keys(filters);
  if (filterKeys.length > 0) {
    // Construir la cláusula WHERE con los filtros proporcionados
    const whereClause = filterKeys.map(key => `${key} = ?`).join(" AND ");
    query += ` WHERE ${whereClause}`;

    // Obtener los valores de los filtros
    const filterValues = filterKeys.map(key => filters[key]);

    // Ejecutar la consulta con los filtros proporcionados
    const [usuarios, campos] = await conexion.query(query, filterValues);
    conexion.release();
    return usuarios;
  } else {
    // Si no se proporcionaron filtros, ejecutar la consulta sin ninguna condición WHERE
    const [usuarios, campos] = await conexion.query(query);
    conexion.release();
    return usuarios;
  }
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
      "INSERT INTO usuario (nombre, apellido, telefono, correo, clave, rol) VALUES (?,?,?,?,?,?)",
      [usuario.nombre, usuario.apellido, usuario.telefono, usuario.correo, clave, usuario.rol]
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
  const [resultado] = await conexion.execute("SELECT paquete.id, paquete.nombre, paquete.descripcion, paquete.limite_canciones, paquete.dias_vigencia, usuario_paquete.fecha_inicio, usuario_paquete.fecha_finalizacion FROM paquete INNER JOIN usuario_paquete ON usuario_paquete.paquete_fk = paquete.id INNER JOIN usuario ON usuario.id = usuario_paquete.usuario_fk WHERE usuario.id = ?",
    [id]);
  conexion.release();
  return resultado[0];
};

export const incrementarNumeroSesion = async (idUsuario) => {
  const conexion = await conexionBD();
  const [resultado] = await conexion.execute("UPDATE usuario SET numero_sesion = numero_sesion + 1 WHERE id = ?", [idUsuario]);
  conexion.release();
  return resultado;
}

export const cambiarClaveUsuario = async (req, res) => {
  const { id } = req.params;
  const { claveActual, nuevaClave } = req.body;
  try {
    const usuario = await obtenerUsuarioServicio(id);

    const claveValida = await verificarClave(claveActual, usuario.clave);
    if (!claveValida) {
      return res.status(400).json({ mensaje: "La clave actual es incorrecta" });
    }
    const claveEncriptada = await encriptarClave(nuevaClave);

    await cambiarClaveUsuarioServicio(id, claveEncriptada);

    if (usuario.primer_cambio_clave === 0) {
      await actualizarUsuarioServicio({ primer_cambio_clave: 1 }, id);
    }

    return res.json({ mensaje: "Clave cambiada exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error al cambiar la clave del usuario" });
  }
};

export const cambiarClaveUsuarioServicio = async (id, nuevaClave) => {
  const conexion = await conexionBD();
  await conexion.query("UPDATE usuario SET clave = ? WHERE id = ?", [nuevaClave, id]);
  conexion.release();
};

export const actualizarAvatarServicio = async (idUsuario, nombreArchivo) => {
  try {
    const conexion = await conexionBD();

    await conexion.query(
      "UPDATE usuario SET foto = ? WHERE id = ?",
      [nombreArchivo, idUsuario]
    );
    conexion.release();
  } catch (error) {
    console.error("Error al actualizar la foto de perfil:", error);
    throw error;
  }
};

export const actualizarEstadoUsuarioServicio = async (idUsuario, estado) => {
  const conexion = await conexionBD();
  const [resultado] = await conexion.execute("UPDATE usuario SET estado = ? WHERE id=?", [estado, idUsuario]);
  conexion.release();
  return resultado;
}