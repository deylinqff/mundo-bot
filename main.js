document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("form-registro").addEventListener("submit", function(event) {
        event.preventDefault();
        document.getElementById("registro").style.display = "none";
        document.getElementById("seleccion-bots").style.display = "block";
    });

    window.mostrarPago = function() {
        document.getElementById("seleccion-bots").style.display = "none";
        document.getElementById("pago").style.display = "block";
    };

    document.getElementById("form-pago").addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Pago realizado con éxito. ¡Gracias por tu compra!");
    });

    // Función para abrir/cerrar el chat de IA
    window.toggleIAChat = function() {
        const chat = document.getElementById("ia-chat");
        chat.style.display = (chat.style.display === "none" || chat.style.display === "") ? "block" : "none";
    };

    // Función para agregar mensajes al chat
    function appendMessage(message, sender) {
        const chatBox = document.getElementById("chat-box");
        const newMessage = document.createElement("div");
        newMessage.textContent = message;
        newMessage.className = sender;
        chatBox.appendChild(newMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Función para enviar mensajes a la API de IA y mostrar la respuesta
    async function sendMessage() {
        const userInput = document.getElementById("user-input").value;
        if (userInput.trim()) {
            appendMessage("Tú: " + userInput, "user");
            document.getElementById("user-input").value = '';

            try {
                const response = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(userInput)}`);
                const data = await response.json();

                // Verifica si la API devolvió un resultado válido
                if (data && data.result) {
                    appendMessage("IA: " + data.result, "ia");
                } else {
                    appendMessage("IA: No se pudo obtener una respuesta de la API.", "ia");
                }
            } catch (error) {
                appendMessage("IA: Error al conectar con la API.", "ia");
                console.error("Error en la API:", error);
            }
        }
    }

    document.getElementById("send-btn").addEventListener("click", sendMessage);
});