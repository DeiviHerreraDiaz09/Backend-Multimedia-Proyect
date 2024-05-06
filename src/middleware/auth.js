export const autorizar = (rol) => (req, res, next) => {
    if (req.session.rol == rol) {
        next();
    } else {
        res.status(401).send("No autorizado");
    }
}

export const autenticacion = async (req, res, next) => {
    if (req.session.usuario) {
        next();
    } else {
        res.send("Fallo al autentificarse");
    }
}