// main.js

document.addEventListener("DOMContentLoaded", function() {
    // Inicializar EmailJS con tu User ID
    emailjs.init("vVyLi_kGrNcGJq1KO4b51");

    // Si hay un usuario registrado, mostrar el perfil; de lo contrario, mostrar el formulario de registro
    if (localStorage.getItem('user')) {
        mostrarPerfil();
    } else {
        document.getElementById('registro').style.display = 'block';
    }

    // Evento para el formulario de registro
    document.getElementById("form-registro").addEventListener("submit", function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;

        // Enviar correo de verificación con EmailJS
        emailjs.send("service_opn3fe5", "template_k7go9rc", {
            to_email: email,
            user_name: nombre
        }).then(function(response) {
            console.log("Correo enviado con éxito:", response);
            alert("Registro exitoso. Revisa tu correo electrónico.");

            // Guardar usuario en localStorage solo si el correo se envía correctamente
            localStorage.setItem('user', JSON.stringify({ nombre, email }));
            mostrarPerfil();
        }).catch(function(error) {
            console.error("Error al enviar el correo:", error);
            alert("Hubo un problema al enviar el correo. Revisa la consola.");
        });
    });

    // Función para mostrar el perfil del usuario
    function mostrarPerfil() {
        const usuario = JSON.parse(localStorage.getItem('user'));
        document.getElementById('user-name').innerText = usuario.nombre;
        document.getElementById('user-email').innerText = usuario.email;

        document.getElementById('registro').style.display = 'none';
        document.getElementById('perfil').style.display = 'block';
        document.getElementById('seleccion-bots').style.display = 'block';
    }

    // Función para cerrar sesión (disponible globalmente)
    window.cerrarSesion = function() {
        localStorage.removeItem('user');
        document.getElementById('perfil').style.display = 'none';
        document.getElementById('registro').style.display = 'block';
        document.getElementById('seleccion-bots').style.display = 'none';
    };

    // Función para mostrar el formulario de pago (disponible globalmente)
    window.mostrarPago = function() {
        document.getElementById('seleccion-bots').style.display = 'none';
        document.getElementById('pago').style.display = 'block';
    };

    // Función para eliminar el registro, solicitando el correo
    window.eliminarRegistro = function() {
        const emailInput = prompt("Ingresa tu correo para eliminar tu registro:");
        if (!emailInput) return; // Si no se ingresa nada, salir

        const usuario = JSON.parse(localStorage.getItem('user'));
        if (usuario && usuario.email === emailInput.trim()) {
            localStorage.removeItem('user');
            alert("Tu registro ha sido eliminado.");
            // Regresar al estado de registro
            document.getElementById('perfil').style.display = 'none';
            document.getElementById('seleccion-bots').style.display = 'none';
            document.getElementById('registro').style.display = 'block';
        } else {
            alert("El correo ingresado no coincide con tu registro.");
        }
    };
});