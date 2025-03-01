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

        appendMessage("🔥 Escribiendo...", "bot");

        try {
            const botResponse = await obtenerRespuestaIA(userInput, appendMessageWithTyping);
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

function appendMessageWithTyping(message) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "bot");
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