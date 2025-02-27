let urlImagen = ""; // Variable para almacenar la URL de la imagen generada

async function generarImagen(prompt) {
    if (!prompt) {
        alert("⚠️ Debes ingresar un texto para generar la imagen.");
        return;
    }

    try {
        document.getElementById("resultado").innerHTML = "✨ Generando imagen...";

        const respuesta = await fetch("https://api.deepai.org/api/text2img", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "api-key": "TU_API_KEY_AQUI" // Reemplázala con tu API Key de DeepAI
            },
            body: `text=${encodeURIComponent(prompt)}`
        });

        const data = await respuesta.json();
        console.log("Respuesta de la API:", data);

        if (!data || !data.output_url) {
            throw new Error("La API no devolvió una imagen válida.");
        }

        urlImagen = data.output_url;

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