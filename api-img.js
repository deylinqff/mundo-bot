let urlImagen = ""; 

async function generarImagen(prompt) {
    if (!prompt) {
        alert("⚠️ Debes ingresar un texto para generar la imagen.");
        return;
    }

    try {
        document.getElementById("resultado").innerHTML = "✨ Generando imagen...";

        // Realizar la petición a la API
        const respuesta = await fetch(`https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${encodeURIComponent(prompt)}`);

        console.log("Estado de la respuesta:", respuesta.status);

        if (!respuesta.ok) {
            throw new Error(`Error en la API: ${respuesta.status} ${respuesta.statusText}`);
        }

        // Verifica si la respuesta es JSON
        const contentType = respuesta.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const data = await respuesta.json();
            console.log("Respuesta de la API:", data);

            if (!data || !data.image || !data.image.url) {
                throw new Error("La API no devolvió una imagen válida.");
            }

            urlImagen = data.image.url;
        } else {
            // Si la API devuelve una imagen directamente, la convertimos en blob
            const blob = await respuesta.blob();
            urlImagen = URL.createObjectURL(blob);
        }

        document.getElementById("resultado").innerHTML = `
            <p>✅ Imagen generada con éxito:</p>
            <img src="${urlImagen}" alt="Imagen generada" style="max-width:100%;border-radius:10px;"><br><br>
            <button onclick="descargarImagen()">📥 Descargar Imagen</button>
        `;

    } catch (error) {
        document.getElementById("resultado").innerHTML = "🚨 Ha ocurrido un error 😔";
        console.error("Error en la generación de imagen:", error);
        alert(`❌ Error: ${error.message}`);
    }
}

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