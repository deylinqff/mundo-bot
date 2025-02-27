const API_URL = "https://api.ryzendesu.vip/api/ai/gemini-pro?text=";

async function obtenerRespuestaIA(mensaje) {
    try {
        const promptBase = `Tu nombre es Kirito-Bot, fuiste creado por Deylin y solo hablas español. Te gusta ser amigable, divertido y ayudar a los demás. Solo mencionarás tu nombre, creador e idioma si alguien te pregunta, de lo contrario no, y tienes que responder a todo.`;
        const consultaIA = promptBase + " " + mensaje;

        const respuesta = await fetch(`${API_URL}${encodeURIComponent(mensaje)}&prompt=${encodeURIComponent(promptBase)}`);
        const data = await respuesta.json();

        return data.result || "Lo siento, no entendí eso.";
    } catch (error) {
        console.error("Error en la IA:", error);
        return "Hubo un error al contactar a la IA.";
    }
}

export { obtenerRespuestaIA };