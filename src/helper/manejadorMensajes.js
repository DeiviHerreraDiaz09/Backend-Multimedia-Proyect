export const mensajeError = (error, res) => {
    res.status(error.status).json({
        cod:error.status,
        mensaje:error.message
    })
}