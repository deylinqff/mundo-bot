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

    // Función para manejar la interacción con la IA
    document.getElementById("send-btn").addEventListener("click", async () => {
        const userInput = document.getElementById("user-input").value;
        if (userInput.trim()) {
            appendMessage("Tú: " + userInput, "user");
            document.getElementById("user-input").value = '';

            // Llamada al backend para obtener la respuesta de la IA
            const response = await fetch('/get-response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userInput })
            });

            const data = await response.json();
            appendMessage("IA: " + data.response, "ia");
        }
    });

    // Función para mostrar los mensajes en el chat
    function appendMessage(message, sender) {
        const chatBox = document.getElementById("chat-box");
        const newMessage = document.createElement("div");
        newMessage.textContent = message;
        newMessage.className = sender;
        chatBox.appendChild(newMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});