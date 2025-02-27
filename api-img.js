// Variable para almacenar la URL de la imagen encontrada
let urlImagen = "";

// Función para mostrar un mensaje en la página
function mostrarMensaje(mensaje) {
    document.getElementById("resultado").innerHTML = mensaje;
}

// Función para buscar imágenes en DuckDuckGo
async function buscarImagenGoogle() {
    const prompt = document.getElementById("prompt").value;

    if (!prompt) {
        alert("⚠️ Debes ingresar un texto para buscar una imagen.");
        return;
    }

    try {
        mostrarMensaje("🔍 Buscando imagen en DuckDuckGo...");

        // Hacemos la solicitud a la API de DuckDuckGo
        const respuesta = await fetch(`https://duckduckgo.com/i.js?q=${encodeURIComponent(prompt)}`);
        const datos = await respuesta.json();

        if (!datos.results.length) {
            throw new Error("No se encontró ninguna imagen.");
        }

        urlImagen = datos.results[0].image; // Tomamos la primera imagen
        mostrarImagenEncontrada(urlImagen);
    } catch (error) {
        mostrarMensaje("🚨 No se encontraron resultados 😔");
        console.error("Error en la búsqueda de imagen:", error);
    }
}

// Función para mostrar la imagen encontrada con un botón de descarga
function mostrarImagenEncontrada(url) {
    document.getElementById("resultado").innerHTML = `
        <p>✅ Imagen encontrada:</p>
        <img src="${url}" alt="Imagen encontrada" style="max-width:100%;border-radius:10px;"><br><br>
        <button onclick="descargarImagen()">📥 Descargar Imagen</button>
    `;
}

// Función para descargar la imagen encontrada
function descargarImagen() {
    if (!urlImagen) {
        alert("⚠️ No hay imagen disponible para descargar.");
        return;
    }

    const enlace = document.createElement("a");
    enlace.href = urlImagen;
    enlace.download = "imagen_encontrada.png";
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
}