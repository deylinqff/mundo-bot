const API_URL = "https://apis-starlights-team.koyeb.app/starlight/gemini?text=";

async function obtenerRespuestaIA(mensaje) {
    try {
        // Convertir mensaje a minúsculas para comparar sin problemas
        const mensajeLower = mensaje.toLowerCase();

        // Respuestas personalizadas
        if (mensajeLower.includes("cómo te llamas") || mensajeLower.includes("tu nombre")) {
            return "Me llamo Kirito-Bot, fui creado por Deylin y solo hablo español.";
        }

        if (mensajeLower.includes("quién te creó") || mensajeLower.includes("quién es tu creador")) {
            return "Fui creado por Deylin.";
        }

        if (mensajeLower.includes("qué idiomas hablas") || mensajeLower.includes("hablas otro idioma")) {
            return "Solo hablo español.";
        }

        // Si no coincide con ninguna respuesta personalizada, consulta la IA
        const respuesta = await fetch(API_URL + encodeURIComponent(mensaje));
        const data = await respuesta.json();
        return data.result || "Lo siento, no entendí eso.";
    } catch (error) {
        console.error("Error en la IA:", error);
        return "Hubo un error al contactar a la IA.";
    }
}

export { obtenerRespuestaIA };