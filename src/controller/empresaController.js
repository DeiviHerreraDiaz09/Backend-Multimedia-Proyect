import {
  obtenerEmpresasServicio,
  obtenerEmpresaServicio,
  crearEmpresaServicio,
  actualizarEmpresaServicio,
} from "../services/empresaService.js";

export const listarEmpresas = async (req, res) => {
  try {
    const empresas = await obtenerEmpresasServicio();
    res.json(empresas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las empresas" });
  }
};

export const listarEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const empresa = await obtenerEmpresaServicio(id);
    res.json(empresa);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la empresa" });
  }
};

export const registrarEmpresa = async (req, res) => {
  try {
    const {
      nit,
      nombre,
      telefono,
      direccion,
      correo,
      usuario_fk,
      sector_empresarial_fk,
    } = req.body;

    const created = await crearEmpresaServicio({
      nit,
      nombre,
      telefono,
      direccion,
      correo,
      usuario_fk,
      sector_empresarial_fk,
    });

    res.json(created);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la empresa" });
  }
};

export const actualizarEmpresa = async (req, res) => {
  const { id } = req.params;
  const {
    nit,
    nombre,
    telefono,
    direccion,
    correo,
    usuario_fk,
    sector_empresarial_fk,
  } = req.body;

  try {
    const nuevosDatos = {};

    if (nit) nuevosDatos.nit = nit;
    if (nombre) nuevosDatos.nombre = nombre;
    if (telefono) nuevosDatos.telefono = telefono;
    if (direccion) nuevosDatos.direccion = direccion;
    if (correo) nuevosDatos.correo = correo;
    if (usuario_fk) nuevosDatos.usuario_fk = usuario_fk;
    if (sector_empresarial_fk)
      nuevosDatos.sector_empresarial_fk = sector_empresarial_fk;

    const actualizaciónEmpresaServicio = await actualizarEmpresaServicio(
      nuevosDatos, id 
    );

    res.json(actualizaciónEmpresaServicio);
  } catch (error) {
    res.status(500).json({ error: "Error al actualziar la empresa" });
  }
};
