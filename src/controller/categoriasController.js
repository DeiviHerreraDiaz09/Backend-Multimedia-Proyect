import { obtenerCategerias } from "../services/categoriasservicio.js";

export const listarCategorias = async (req, res) => {
  try {
    const categorias = await obtenerCategerias();
    res.render("./categoria/listarCategorias", { categorias });
  } catch (error) {
    console.log(error);
    res.render("index", { mensaje: error.message });
  }
}

export const formularioCategoria = async (req, res) => {
  try {
    res.render("./categoria/formularioCategoria")
  } catch (error) {
    console.log(error);
    res.render("index", { mensaje: error.message });
  }
};
