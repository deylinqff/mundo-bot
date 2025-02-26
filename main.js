require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,  // Usa variables de entorno para seguridad
        pass: process.env.PASSWORD
    }
});

// Ruta para enviar correo de verificación
app.post('/enviar-correo', (req, res) => {
    const { email, nombre } = req.body;
    const token = Math.random().toString(36).substr(2); // Token de verificación

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Verificación de cuenta - Kirito Bot',
        html: `<h2>Hola, ${nombre}</h2>
               <p>Confirma tu correo haciendo clic en el siguiente enlace:</p>
               <a href="http://tu-dominio.com/verificar?token=${token}">Verificar cuenta</a>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error al enviar el correo');
        } else {
            console.log('Correo enviado: ' + info.response);
            res.status(200).send('Correo enviado con éxito');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});