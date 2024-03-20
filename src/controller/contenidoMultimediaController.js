

export const listarBanners = async (req, res) => {
  try {
    // LISTAR CONTENIDO
  } catch (error) {
    
  }
};

export const registrarContenido = async (req, res) => {
  const { palabra } = req.body;
  console.log("Esto es el body" + JSON.stringify(req.body));
  try { 
    console.log(palabra);  
  } catch (error) {
    console.log(error);
    res.status(500).send('Error interno del servidor');
  }
};
