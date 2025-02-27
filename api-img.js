let urlImagen = ""; // Variable para almacenar la URL de la imagen generada

async function generarImagen(prompt) {
    if (!prompt) {
        alert("⚠️ Debes ingresar un texto para generar la imagen.");
        return;
    }

    try {
        // Mostrar mensaje de carga en la web
        document.getElementById("resultado").innerHTML = "✨ Generando imagen...";

        // Llamada a la API
        const respuesta = await fetch(`https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${encodeURIComponent(prompt)}`);

        if (!respuesta.ok) {
            throw new Error("Error en la generación de la imagen.");
        }

        // Convertir la respuesta a JSON
        const data = await respuesta.json();

        if (!data || !data.image || !data.image.url) {
            throw new Error("La API no devolvió una imagen válida.");
        }

        // Obtener la URL de la imagen generada
        urlImagen = data.image.url;

        // Mostrar imagen generada en la web con botón de descarga
        document.getElementById("resultado").innerHTML = `
            <p>✅ Imagen generada con éxito:</p>
            <img src="${urlImagen}" alt="Imagen generada" style="max-width:100%;border-radius:10px;"><br><br>
            <button onclick="descargarImagen()">📥 Descargar Imagen</button>
        `;
    } catch (error) {
        document.getElementById("resultado").innerHTML = "🚨 Ha ocurrido un error 😔";
        console.error("Error en la generación de imagen:", error);
    }
}

// Función para descargar la imagen
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