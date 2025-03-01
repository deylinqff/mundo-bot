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

        appendMessage("👑 Escribiendo...", "bot");

        try {
            const botResponse = await obtenerRespuestaIA(userInput);
            removeTypingIndicator();
            typeMessage(botResponse); // Añadido para la animación de escritura
        } catch (error) {
            removeTypingIndicator();
            appendMessage("Hubo un error al obtener la respuesta.", "bot");
        }
    }
}

function appendMessage(message, sender) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTypingIndicator() {
    const chatBox = document.getElementById("chat-box");
    const messages = chatBox.getElementsByClassName("bot");
    if (messages.length > 0) {
        messages[messages.length - 1].remove();
    }
}

function typeMessage(message) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "bot");
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    let i = 0;
    messageDiv.textContent = ''; // Inicializa el mensaje vacío
    const typingInterval = setInterval(() => {
        messageDiv.textContent += message[i];
        i++;
        if (i === message.length) {
            clearInterval(typingInterval);
        }
    }, 50); // Ajusta la velocidad de escritura
}