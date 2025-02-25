// Función de Registro
document.getElementById("formRegistro").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar envío por defecto
    document.getElementById("registro").style.display = "none";
    document.getElementById("seleccionBots").style.display = "block";
});

// Redirigir a la página de pago al elegir un bot
function redirigirPago(botType) {
    document.getElementById("seleccionBots").style.display = "none";
    document.getElementById("pago").style.display = "block";
    alert("Seleccionaste el Bot: " + botType + ". ¡Procede al pago!");
}

// Función de Pago
document.getElementById("formPago").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Pago procesado con éxito. ¡Gracias por tu compra!");
});