const API_URL = "https://tu-api-de-ia.com/chat"; // Reemplázalo con tu API real

async function obtenerRespuestaIA(mensaje) {
    try {
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ mensaje })
        });

        const data = await respuesta.json();
        return data.respuesta || "Lo siento, no entendí eso.";
    } catch (error) {
        console.error("Error en la IA:", error);
        return "Hubo un error al contactar a la IA.";
    }
}

export { obtenerRespuestaIA };