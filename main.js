document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("form-registro").addEventListener("submit", function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;

        // Guardar usuario en localStorage
        localStorage.setItem('user', JSON.stringify({ nombre, email }));

        // Ocultar el registro y mostrar la selección de bots
        document.getElementById("registro").style.display = "none";
        document.getElementById("seleccion-bots").style.display = "block";

        // Inicializar EmailJS
        emailjs.init("vVyLi_kGrNcGJq1KO4b51");  // Reemplaza con tu User ID

        // Enviar correo de verificación con EmailJS
        emailjs.send("service_opn3fe5", "template_k7go9rc", {
            to_email: email,
            user_name: nombre
        }).then(function(response) {
            alert("Correo de verificación enviado. Revisa tu bandeja de entrada.");
        }, function(error) {
            console.error("Error al enviar el correo:", error);
        });
    });

    window.mostrarPago = function() {
        document.getElementById("seleccion-bots").style.display = "none";
        document.getElementById("pago").style.display = "block";
    };

    document.getElementById("form-pago").addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Pago realizado con éxito. ¡Gracias por tu compra!");
    });
});