// main.js

document.addEventListener("DOMContentLoaded", function() {
    // Verificar si ya hay un usuario registrado
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

        // Guardar usuario en localStorage
        localStorage.setItem('user', JSON.stringify({ nombre, email }));
        mostrarPerfil();
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