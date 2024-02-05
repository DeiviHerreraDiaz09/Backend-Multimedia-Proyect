import { readFile } from "fs";
import { obtenerCategerias } from "../services/categoriasservicio.js";
import { crearContenidoMultimediaServicio } from "../services/contenidoMultimedia.js";
import { join } from "path";
import { dirnamePath } from "../helper/__dirname__.js";

export const formularioMultimediaContenido = async (req, res) => {
  try {
    const categorias = await obtenerCategerias();
    res.render("./contenidoMultimedia/formularioContenidoMultimedia", {
      categorias,
    });
  } catch (error) {
    res.render("index", { mensaje: error.message });
  }
};

export const crearContenidoMultimedia = async (req, res) => {
  try {
    const { titulo, categoria } = req.body;
    const archivo = req.file.filename
    console.log(titulo, categoria, archivo);
    const contenidoMultimedia = await crearContenidoMultimediaServicio({titulo, archivo, categoria});
    res.send(contenidoMultimedia);
  } catch (error) {
    console.log(error);
  }
};

export const obtenerArchivo = async (req, res) => {
    try {
      const {archivo} = req.params;
      const RUTAGUARDADO = dirnamePath;
      const archivoEncontrado = join(RUTAGUARDADO, `/uploads/${archivo}`)
      res.sendFile(archivoEncontrado);
    } catch (error) {
      console.log(error);
    };
}