// Esperar a que el DOM cargue antes de ejecutar el script
document.addEventListener("DOMContentLoaded", function () {
    
    // Variables de las secciones
    const registro = document.getElementById("registro");
    const seleccionBots = document.getElementById("seleccionBots");
    const pago = document.getElementById("pago");

    // Formulario de registro
    document.getElementById("formRegistro").addEventListener("submit", function (event) {
        event.preventDefault();
        
        // Guardar datos en LocalStorage
        const usuario = document.getElementById("usuario").value;
        localStorage.setItem("usuario", usuario);
        
        // Pasar a la siguiente sección
        registro.style.display = "none";
        seleccionBots.style.display = "block";
    });

    // Función para redirigir a la página de pago
    window.redirigirPago = function () {
        seleccionBots.style.display = "none";
        pago.style.display = "block";
    };

    // Formulario de pago
    document.getElementById("formPago").addEventListener("submit", function (event) {
        event.preventDefault();
        
        // Simulación de pago
        alert("Pago realizado con éxito. ¡Gracias por tu compra!");
        
        // Reiniciar el flujo
        pago.style.display = "none";
        registro.style.display = "block";
    });

});