// Variable para almacenar la URL de la imagen generada
let urlImagen = "";

// Función para generar la imagen con IA
async function generarImagen(prompt) {
    if (!prompt) {
        alert("⚠️ Debes ingresar un texto para generar la imagen.");
        return;
    }

    try {
        mostrarMensaje("✨ Generando imagen...");

        const respuesta = await obtenerImagenDesdeAPI(prompt);

        if (!respuesta) {
            throw new Error("La API no devolvió una imagen válida.");
        }

        const blob = await respuesta.blob();
        urlImagen = URL.createObjectURL(blob);

        mostrarImagenGenerada(urlImagen);
    } catch (error) {
        mostrarMensaje("🚨 Ha ocurrido un error 😔");
        console.error("Error en la generación de imagen:", error);
        alert(`❌ Error: ${error.message}`);
    }
}

// Función para mostrar un mensaje en la página
function mostrarMensaje(mensaje) {
    document.getElementById("resultado").innerHTML = mensaje;
}

// Función para realizar la solicitud a la API de IA
async function obtenerImagenDesdeAPI(prompt) {
    try {
        const urlAPI = "https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=" + encodeURIComponent(prompt);
        const respuesta = await fetch(urlAPI, {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status} - ${respuesta.statusText}`);
        }

        return respuesta;
    } catch (error) {
        console.error("Error al obtener la imagen desde la API:", error);
        return null;
    }
}

// Función para mostrar la imagen generada con un botón de descarga
function mostrarImagenGenerada(url) {
    document.getElementById("resultado").innerHTML = `
        <p>✅ Imagen generada con éxito:</p>
        <img src="${url}" alt="Imagen generada" style="max-width:100%;border-radius:10px;"><br><br>
        <button onclick="descargarImagen()">📥 Descargar Imagen</button>
    `;
}

// Función para descargar la imagen generada
function descargarImagen() {
    if (!urlImagen) {
        alert("⚠️ No hay imagen generada para descargar.");
        return;
    }

    const enlace = document.createElement("a");
    enlace.href = urlImagen;
    enlace.download = "imagen_generada.png";
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
}

// Función para buscar imágenes en Google
async function buscarImagenGoogle() {
    const prompt = document.getElementById("prompt").value;

    if (!prompt) {
        alert("⚠️ Debes ingresar un texto para buscar una imagen.");
        return;
    }

    try {
        mostrarMensaje("🔍 Buscando imagen en Google...");

        const res = await googleImage(prompt);
        const image = await res.getRandom();

        if (!image) {
            throw new Error("No se encontró ninguna imagen.");
        }

        urlImagen = image;
        mostrarImagenGenerada(urlImagen);
    } catch (error) {
        mostrarMensaje("🚨 No se encontraron resultados 😔");
        console.error("Error en la búsqueda de imagen:", error);
    }
}