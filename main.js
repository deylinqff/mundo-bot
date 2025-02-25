// Capturar el formulario de registro
document.getElementById("formRegistro").addEventListener("submit", function(event) {
    event.preventDefault(); 
    document.getElementById("registro").style.display = "none"; 
    document.getElementById("seleccionBots").style.display = "block"; 
});

// Función para redirigir a la página de pago
function redirigirPago() {
    document.getElementById("seleccionBots").style.display = "none";
    document.getElementById("pago").style.display = "block";
}

// Capturar el formulario de pago
document.getElementById("formPago").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Pago realizado con éxito. ¡Gracias por tu compra!");
});