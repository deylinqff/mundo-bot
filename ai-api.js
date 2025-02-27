const API_URL = "https://apis-starlights-team.koyeb.app/starlight/gemini?text=";

async function obtenerRespuestaIA(mensaje) {
    try {
        const respuesta = await fetch(API_URL + encodeURIComponent(mensaje));
        const data = await respuesta.json();
        return data.result || "Lo siento, no entendí eso.";
    } catch (error) {
        console.error("Error en la IA:", error);
        return "Hubo un error al contactar a la IA.";
    }
}

export { obtenerRespuestaIA };