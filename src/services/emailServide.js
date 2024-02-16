import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { resolve } from "path";
import dotenv from "dotenv";
import { dirnamePath } from "../helper/__dirname__.js";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    post: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORDEMAIL,
    },
    tls: {
      ciphers: 'SSLv3',
    },
  });

const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: resolve(dirnamePath, './view'),
    defaultLayout: false
  },
  viewPath: resolve(dirnamePath, './view'),
  extName: ".handlebars"
};


transporter.use('compile', hbs(handlebarOptions));

const enviarCorreo = (opcionesEmail) => {
  transporter.sendMail(opcionesEmail, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(`Correo electrónico enviado: ${info.response}`);
    }
  });
};

export { enviarCorreo };
