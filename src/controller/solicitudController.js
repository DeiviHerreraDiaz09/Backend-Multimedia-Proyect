export const formularioSolicitud = async (req, res) => {
    try {
      res.render("./solicitud/formularioSolicitud")
    } catch (error) {
      console.log(error);
      res.render("index", { mensaje: error.message });
    }
  };
  