import { compare, hash } from "bcrypt";


export const encriptarClave = async (clavePlana) => {
   const claveEncriptada = await hash(clavePlana, 8);
    return claveEncriptada;
}

export const verificarClave = async (clavePlana, claveEncriptada) => {
    const esValida = await compare(clavePlana, claveEncriptada);
    return esValida
}