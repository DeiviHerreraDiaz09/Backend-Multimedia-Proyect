import { compare, hash } from "bcrypt";


export const encriptarClave = async (clavePlana) => {
   const claveEncriptada = await hash(clavePlana, 8);
    return claveEncriptada;
}

export const verificarClave = async (clavePlana, claveEncriptada) => {
    const esValida = await compare(clavePlana, claveEncriptada);
    return esValida
}

export const generarCodigoAleatorio = (longitud) => {
        let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let codigo = '';
    
        for (let i = 0; i < longitud; i++) {
            let indiceAleatorio = Math.floor(Math.random() * caracteres.length);
            codigo += caracteres.charAt(indiceAleatorio);
        }
    
        return codigo;
}