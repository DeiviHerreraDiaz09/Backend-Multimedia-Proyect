import {
  obtenerSectoresEmpresarialesServicio,
  obtenerSectorEmpresarialServicio,
  crearSectoresEmpresarialesServicio,
  actualizarSectorServicio,
} from "../services/sectorEmpresarialService.js";

export const listarSectores = async (req, res) => {
  try {
    const sectores = await obtenerSectoresEmpresarialesServicio();
    res.json(sectores);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los sectores" });
  }
};

export const listarSector = async (req, res) => {
  try {
    const { id } = req.params;
    const sector = await obtenerSectorEmpresarialServicio(id);
    res.json(sector);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el sector" });
  }
};

export const registrarSectorEmpresarial = async (req, res) => {
  try {
    const { nombre } = req.body;
    const created = await crearSectoresEmpresarialesServicio(nombre);
    res.json(created);
  } catch (error) {
    res.status(500).json({ error: "Error en la creación del sector" });
  }
};

export const actualizarSector = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const updated = await actualizarSectorServicio(nombre, id);
    res.json({
      msg: "Sector actualizado correctamente",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ error: "Error en la actualización del sector" });
  }
};
