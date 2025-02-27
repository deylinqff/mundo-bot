let urlImagen = ""; // Variable para almacenar la URL de la imagen generada

async function generarImagen(prompt) {
    if (!prompt) {
        alert("⚠️ Debes ingresar un texto para generar la imagen.");
        return;
    }

    try {
        document.getElementById("resultado").innerHTML = "✨ Generando imagen...";

        // Usando CORS Anywhere para evitar problemas de CORS
        const respuesta = await fetch(`https://cors-anywhere.herokuapp.com/https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${encodeURIComponent(prompt)}`, {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status} - ${respuesta.statusText}`);
        }

        // Convertir la respuesta a Blob para imagen
        const blob = await respuesta.blob();
        urlImagen = URL.createObjectURL(blob);

        // Mostrar imagen generada en la web con botón de descarga
        document.getElementById("resultado").innerHTML = `
            <p>✅ Imagen generada con éxito:</p>
            <img src="${urlImagen}" alt="Imagen generada" style="max-width:100%;border-radius:10px;"><br><br>
            <button onclick="descargarImagen()">📥 Descargar Imagen</button>
        `;
    } catch (error) {
        document.getElementById("resultado").innerHTML = "🚨 Ha ocurrido un error 😔";
        console.error("Error en la generación de imagen:", error);
        alert(`❌ Error: ${error.message}`); // Muestra el mensaje de error en una alerta
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