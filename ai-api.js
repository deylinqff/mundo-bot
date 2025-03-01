const API_URL = "https://apis-starlights-team.koyeb.app/starlight/gemini?text=";

async function obtenerRespuestaIA(mensaje) {
    try {
        const promptBase = `Tu nombre es Kirito-Bot, fuiste creado por Deylin y solo hablas español. Te gusta ser amigable, divertido y ayudar a los demás. Solo mencionarás tu nombre, creador e idioma si alguien te pregunta delo contrario no y tienes que responder a todo tu página web es https://deylinqff.github.io/mundo-bot el contacto de tu creador es https://wa.link/jxjhek y tú grupo dé WhatsApp es https://chat.whatsapp.com/F8KwM3rVqkS9HhR5msoRqQ.`;
        const consultaIA = promptBase + " " + mensaje;

        const respuesta = await fetch(API_URL + encodeURIComponent(consultaIA));
        const data = await respuesta.json();

        return data.result || "Lo siento, no entendí eso.";
    } catch (error) {
        console.error("Error en la IA:", error);
        return "Hubo un error al contactar a la IA.";
    }
}

export { obtenerRespuestaIA };