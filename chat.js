<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat con IA</title>
    <link rel="stylesheet" href="CSS/styles.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            background: url('assets/images/fondo2.jpg') no-repeat center center fixed;
            background-size: cover;
            color: black;
            text-align: center;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }

        #chat-container {
            width: 90%;
            max-width: 600px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 10px;
        }

        #chat-box {
            height: 400px;
            overflow-y: auto;
            border: 1px solid #ccc;
            padding: 10px;
            background: #fff;
        }

        .message {
            margin: 5px 0;
            padding: 8px;
            border-radius: 5px;
        }

        .user {
            font-weight: bold;
            color: #007bff;
        }

        .bot {
            font-weight: bold;
            color: #28a745;
        }

        #user-input {
            width: calc(100% - 80px);
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        #send-btn {
            padding: 10px;
            border: none;
            background: #007bff;
            color: white;
            border-radius: 5px;
            cursor: pointer;
        }

        #send-btn:hover {
            background: #0056b3;
        }

        .typing-indicator {
            font-style: italic;
            color: #6c757d;
        }
    </style>
</head>
<body>

<div id="chat-container">
    <h2>Chat con IA</h2>
    <div id="chat-box"></div>
    <input type="text" id="user-input" placeholder="Escribe un mensaje...">
    <button id="send-btn">Enviar</button>
</div>

<script src="ai-api.js"></script>
<script>
    import { obtenerRespuestaIA } from "./ai-api.js";

    document.getElementById("send-btn").addEventListener("click", sendMessage);
    document.getElementById("user-input").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    async function sendMessage() {
        const userInput = document.getElementById("user-input").value.trim();
        if (userInput) {
            appendMessage(userInput, "user");
            document.getElementById("user-input").value = '';

            appendMessage("Escribiendo...", "bot", true);

            try {
                const botResponse = await obtenerRespuestaIA(userInput);
                removeTypingIndicator();
                appendMessage(botResponse, "bot");
            } catch (error) {
                removeTypingIndicator();
                appendMessage("Hubo un error al obtener la respuesta.", "bot");
            }
        }
    }

    function appendMessage(message, sender, isTyping = false) {
        const chatBox = document.getElementById("chat-box");
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender);

        if (isTyping) {
            messageDiv.classList.add("typing-indicator");
        }

        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function removeTypingIndicator() {
        const chatBox = document.getElementById("chat-box");
        const typingIndicators = chatBox.getElementsByClassName("typing-indicator");
        if (typingIndicators.length > 0) {
            typingIndicators[0].remove();
        }
    }
</script>

</body>
</html>