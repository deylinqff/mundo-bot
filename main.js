document.addEventListener("DOMContentLoaded", function() {
    // Inicializar EmailJS con tu User ID
    emailjs.init("LWsrciZNxdDO5OhL1_8mA");

    // Registro de usuario con envío de correo de verificación
    document.getElementById("form-registro").addEventListener("submit", function(event) {
        event.preventDefault();  

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;

        // Enviar correo con EmailJS
        emailjs.send("service_opn3fe5", "template_k7go9rc", {
            to_email: email,
            user_name: nombre
        }).then(function(response) {
            console.log("Correo enviado con éxito:", response);
            alert("Registro exitoso. Revisa tu correo electrónico.");

            // Guardar usuario en localStorage solo si el correo se envía correctamente
            localStorage.setItem('user', JSON.stringify({ nombre, email }));

            // Ocultar el registro y mostrar la selección de bots
            document.getElementById("registro").style.display = "none";
            document.getElementById("seleccion-bots").style.display = "block";
        }).catch(function(error) {
            console.error("Error al enviar el correo:", error);
            alert("Hubo un problema al enviar el correo. Revisa la consola.");
        });
    });
});