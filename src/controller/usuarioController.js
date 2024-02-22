import {
  obtenerUsuariosServicio,
  obtenerUsuarioServicio,
  crearUsuarioServicio,
  actualizarUsuarioServicio,
  usuarioAdquierePaquete,
  consultarPaqueteUsuario,
} from "../services/usuarioService.js";

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await obtenerUsuariosServicio();
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
    const response= await usuarioAdquierePaquete(data);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
}
export const paqueteUsuario = async (req, res) => {
  try {
    const {id} = req.params;
    const response= await consultarPaqueteUsuario(id);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
}