<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro y Alquiler de Bot</title>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"></script>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <!-- Formulario de registro -->
    <div id="registro" class="container">
        <h2>Registro para Alquilar o Comprar el Bot</h2>
        <input type="email" id="email" placeholder="Correo electrónico">
        <input type="password" id="password" placeholder="Contraseña">
        <button onclick="registrar()">Continuar</button>
        <p id="mensaje"></p>
    </div>

    <!-- Panel de selección de bot después de registrarse -->
    <div id="panel" class="container" style="display: none;">
        <h2>Selecciona el Bot que deseas</h2>
        <select id="categoria">
            <option value="soporte">Bot de Soporte</option>
            <option value="ventas">Bot de Ventas</option>
            <option value="musica">Bot de Música</option>
        </select>
        <button onclick="mostrarOpciones()">Seleccionar</button>
    </div>

    <!-- Opciones de compra o alquiler del bot -->
    <div id="opciones" class="container" style="display: none;">
        <h2>Elige cómo deseas usar el Bot</h2>
        <button onclick="irAlPago('alquilar')">Alquilar</button>
        <button onclick="irAlPago('comprar')">Comprar</button>
    </div>

    <script src="app.js"></script>
</body>
</html>