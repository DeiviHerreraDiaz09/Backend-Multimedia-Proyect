import { join } from "path";
import {
  obtenerUsuariosServicio,
  obtenerUsuarioServicio,
  crearUsuarioServicio,
  actualizarUsuarioServicio,
  usuarioAdquierePaquete,
  consultarPaqueteUsuario,
  actualizarAvatarServicio,
} from "../services/usuarioService.js";
import { createReadStream, existsSync } from "fs";

export const listarUsuarios = async (req, res) => {
  try {
    const filters = req.query;
    const usuarios = await obtenerUsuariosServicio(filters);
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

export const listarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await obtenerUsuarioServicio(id);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const registrarUsuarios = async (req, res) => {
  const { nombre, apellido, telefono, correo, rol } = req.body;
  try {
    const created = await crearUsuarioServicio({
      nombre,
      apellido,
      telefono,
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

export const avatarUsuario = async (req, res) => {
  try {
    await actualizarAvatarServicio(req.params.id, req.file.filename);
    res.status(200).json({ message: 'Foto actualizada correctamente' });
    console.log(req.params.id, req.file.filename);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ha ocurrido un error al actualizar la foto del usuario' });
  }
};

export const actualizarUsuario = async (req, res) => {
  const { nombre, apellido, correo, rol } = req.body;
  const { id } = req.params;
  try {
    const nuevosDatos = {};

    if (nombre) nuevosDatos.nombre = nombre;
    if (apellido) nuevosDatos.apellido = apellido;
    if (correo) nuevosDatos.correo = correo;
    if (rol) nuevosDatos.rol = rol;

    const actualizaciónUsuarioServicio = await actualizarUsuarioServicio(
      nuevosDatos,
      id
    );

    if (!actualizaciónUsuarioServicio)
      return res.json({ msg: "No se pudo actualizar los datos del usuario" });

    return res.json({
      msg: "Usuario actualizado correctamente",
      data: actualizaciónUsuarioServicio,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error al actualizar usuario" });
  }
};

export const adquirirPaqueteUsuario = async (req, res) => {
  try {
    const data = req.body;
    const response = await usuarioAdquierePaquete(data);
    res.status(200).json(response);
  } catch (error) {
    res.json(error);
  }
}
export const paqueteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await consultarPaqueteUsuario(id);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
}
export const mostrarAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    const avatarPath = path.join("src/uploads/avatars", id);

    if (!existsSync(avatarPath)) {
      return res.status(404).json({ error: "Avatar not found" });
    }

    res.setHeader('Content-Type', 'image/jpeg');

    createReadStream(avatarPath).pipe(res);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const mostrarAvatarPorUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await obtenerUsuarioServicio(id);

    if (!usuario || !usuario.foto) {
      return res.status(404).json({ error: "Avatar not found for this user" });
    }
    const avatarPath = join("src/uploads/avatars", usuario.foto);

    if (!existsSync(avatarPath)) {
      return res.status(404).json({ error: "Avatar not found" });
    }
    res.setHeader('Content-Type', 'image/jpeg');
    createReadStream(avatarPath).pipe(res);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};