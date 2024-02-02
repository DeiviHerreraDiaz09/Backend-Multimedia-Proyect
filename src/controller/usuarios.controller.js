import { dirnamePath } from "../helper/__dirname__.js";
import {
  crearUsuarioServicio,
  loginServicio,
  obtenerUsuarioServicio,
} from "../services/usuariosservicio.js";

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await obtenerUsuarioServicio();
    res.render("usuarios", { usuarios });
  } catch (error) {
    console.log(error);
  }
};

export const registrarUsuarios = async (req, res) => {
  const {nombre, apellido, correo, rol} = req.body;
  try {
    await crearUsuarioServicio({nombre, apellido, correo, rol});
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { correo, clave, recordar } = req.body;
  console.log(recordar);
  try {
    const usuario = await loginServicio(correo, clave);
    req.session.usuario = usuario;
    let [{nombre}] = usuario
    res.render("dashboard", {
      pageTitle: 'Página del Administrador',
      nombre:nombre
    })
  } catch (error) {
    res.render("index", { mensaje: error.message, correo });
  }
};

export const formularioUsuario = (req, res) => {
  try {
    res.render("./admin/formularioUsuario")
  } catch (error) {
    console.log(error);
    res.render("index", { mensaje: error.message });
  }
}