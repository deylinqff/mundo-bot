// Variable para almacenar la URL de la imagen generada
let urlImagen = "";

// Función para generar la imagen
async function generarImagen(prompt) {
    // Verificar si el usuario ingresó un prompt
    if (!prompt) {
        alert("⚠️ Debes ingresar un texto para generar la imagen.");
        return;
    }

    try {
        // Mostrar mensaje de carga mientras se genera la imagen
        mostrarMensaje("✨ Generando imagen...");

        // Realizar la solicitud a la API
        const respuesta = await obtenerImagenDesdeAPI(prompt);

        // Si la respuesta es válida, procesar la imagen
        if (!respuesta) {
            throw new Error("La API no devolvió una imagen válida.");
        }

        // Convertir la respuesta a un objeto Blob (imagen)
        const blob = await respuesta.blob();
        urlImagen = URL.createObjectURL(blob);

        // Mostrar la imagen generada con un botón para descargarla
        mostrarImagenGenerada(urlImagen);
    } catch (error) {
        // Mostrar mensaje de error si algo falla
        mostrarMensaje("🚨 Ha ocurrido un error 😔");
        console.error("Error en la generación de imagen:", error);
        alert(`❌ Error: ${error.message}`);
    }
}

// Función para mostrar un mensaje en la página
function mostrarMensaje(mensaje) {
    document.getElementById("resultado").innerHTML = mensaje;
}

// Función para realizar la solicitud a la API
async function obtenerImagenDesdeAPI(prompt) {
    try {
        const urlAPI = "https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=" + encodeURIComponent(prompt);
        const respuesta = await fetch(urlAPI, {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0" // Solo User-Agent, ya que la API no requiere API Key
            }
        });

        // Si la respuesta no es correcta, lanzar un error
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status} - ${respuesta.statusText}`);
        }

        return respuesta; // Retornar la respuesta si todo es correcto
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

    // Crear un enlace temporal para descargar la imagen
    const enlace = document.createElement("a");
    enlace.href = urlImagen;
    enlace.download = "imagen_generada.png";
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
}