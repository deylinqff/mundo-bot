<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kirito-Bot Web</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            text-align: center;
        }
        .container {
            width: 100%;
            max-width: 400px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
        }
        input, button {
            width: 100%;
            padding: 10px;
            margin-top: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .bot {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 10px 0;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .bot button {
            width: 80px;
        }
    </style>
</head>
<body>

    <!-- Página de Registro -->
    <div id="registro" class="container">
        <h2>Registro</h2>
        <form id="formRegistro">
            <input type="text" id="usuario" placeholder="Usuario" required>
            <input type="email" id="email" placeholder="Correo Electrónico" required>
            <input type="password" id="password" placeholder="Contraseña" required>
            <button type="submit">Registrarse</button>
        </form>
    </div>

    <!-- Página de Selección de Bots (Oculta al inicio) -->
    <div id="seleccionBots" class="container" style="display: none;">
        <h2>Selecciona un Bot</h2>
        <div class="bot">
            <span>Bot de Grupos</span>
            <button onclick="redirigirPago()">Comprar 🛒</button>
        </div>
        <div class="bot">
            <span>Bot Personal</span>
            <button onclick="redirigirPago()">Comprar 🛒</button>
        </div>
    </div>

    <!-- Página de Pago (Oculta al inicio) -->
    <div id="pago" class="container" style="display: none;">
        <h2>Pago</h2>
        <form id="formPago">
            <input type="text" id="tarjeta" placeholder="Número de Tarjeta" required>
            <input type="text" id="cvv" placeholder="CVV" required>
            <button type="submit">Pagar</button>
        </form>
    </div>

    <script>
        // Capturar el formulario de registro
        document.getElementById("formRegistro").addEventListener("submit", function(event) {
            event.preventDefault(); 
            document.getElementById("registro").style.display = "none"; 
            document.getElementById("seleccionBots").style.display = "block"; 
        });

        // Función para redirigir a la página de pago
        function redirigirPago() {
            document.getElementById("seleccionBots").style.display = "none";
            document.getElementById("pago").style.display = "block";
        }

        // Capturar el formulario de pago
        document.getElementById("formPago").addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Pago realizado con éxito. ¡Gracias por tu compra!");
        });
    </script>

</body>
</html>