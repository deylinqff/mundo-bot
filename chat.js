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
            typeMessage(botResponse);
        } catch (error) {
            removeTypingIndicator();
            appendMessage("Hubo un error al obtener la respuesta.", "bot");
        }
    }
}

// Agregar la función TTS
async function tts2(efecto, texto) {
    if (!efecto) {
        appendMessage("🍬 No has ingresado un efecto, por favor ingresa un efecto de voz.", "bot");
        return;
    }

    let voiceList = await getVoiceList();
    let efectoValido = voiceList.resultado.some(entry => entry.ID === efecto);

    if (!efectoValido) {
        appendMessage("🍭 El efecto proporcionado no existe en la lista.", "bot");
        return;
    }

    if (!texto) {
        appendMessage("🍬 Ingresa el texto que quieras convertir a audio.", "bot");
        return;
    }

    try {
        const audioUrl = await makeTTSRequest(texto, efecto);
        if (audioUrl) {
            appendMessage("¡Aquí está tu audio!", "bot");
            playAudio(audioUrl);
        } else {
            appendMessage("🍭 No se pudo obtener el audio.", "bot");
        }
    } catch (error) {
        appendMessage("⚠️ Error al procesar el audio.", "bot");
    }
}

// Función para obtener la lista de voces
async function getVoiceList() {
    const url = 'https://play.ht/api/v2/voices';
    const headers = {
        'accept': 'application/json',
        'Authorization': `Bearer ${secretKey}`,
        'X-USER-ID': userId
    };
    try {
        const response = await fetch(url, { headers });
        const data = await response.json();
        const simplifiedList = data.map(entry => ({
            ID: entry.id,
            name: entry.name,
            lenguaje: entry.language
        }));
        return { resultado: simplifiedList };
    } catch (error) {
        console.error("Error al obtener lista de voces:", error);
        return { resultado: [] };
    }
}

// Función para hacer la solicitud TTS y obtener la URL del audio
async function makeTTSRequest(texto, efecto) {
    const requestData = { text: texto, voice: efecto };
    const headers = {
        'Authorization': `Bearer ${secretKey}`,
        'X-User-Id': userId,
        'accept': 'text/event-stream',
        'content-type': 'application/json'
    };
    try {
        const response = await fetch('https://play.ht/api/v2/tts', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestData)
        });
        const responseData = await response.json();
        const url = responseData.url; // Ajusta si es necesario según la API
        return url;
    } catch (error) {
        console.error("Error en la solicitud TTS:", error);
        return null;
    }
}

// Función para reproducir el audio
function playAudio(url) {
    const audio = new Audio(url);
    audio.play();
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
    messageDiv.textContent = '';
    const typingInterval = setInterval(() => {
        messageDiv.textContent += message[i];
        i++;
        if (i === message.length) {
            clearInterval(typingInterval);
        }
    }, 50);
}