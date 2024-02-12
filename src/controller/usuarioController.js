import {
  obtenerUsuariosServicio,
  obtenerUsuarioServicio,
  crearUsuarioServicio,
  actualizarUsuarioServicio,
} from "../services/usuarioService.js";

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

export const actualizarUsuarioPath = async (req, res) => {
  const { nombre, apellido, correo, rol } = req.body;
  const { id } = req.params;
  try {
    const usuario = await obtenerUsuarioServicio(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

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
