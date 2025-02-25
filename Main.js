import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import { Low, JSONFile } from 'lowdb';
import pino from 'pino';

// Inicia un servidor Express
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Configura la base de datos (puede ser MongoDB u otro, dependiendo de tus necesidades)
const db = new Low(new JSONFile('src/database/database.json'));
await db.read();

// Define el puerto del servidor web
const PORT = process.env.PORT || 3000;

// Logger
const logger = pino({ level: 'info' });

// Middleware para servir archivos estáticos (ej. imágenes, CSS, JS)
app.use(express.static('public'));

// Ruta principal para la página web
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// WebSocket para manejar eventos en tiempo real
wss.on('connection', (ws) => {
  console.log('Nuevo cliente conectado');

  // Enviar un mensaje de bienvenida al cliente
  ws.send(JSON.stringify({ message: 'Bienvenido a la app web' }));

  // Recibir mensajes del cliente
  ws.on('message', (data) => {
    console.log('Mensaje recibido:', data);

    // Puedes aquí procesar la lógica y enviar respuestas en tiempo real
    ws.send(JSON.stringify({ message: `Echo: ${data}` }));
  });

  // Manejar desconexión de cliente
  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar servidor
server.listen(PORT, () => {
  logger.info(`Servidor web corriendo en http://localhost:${PORT}`);
});