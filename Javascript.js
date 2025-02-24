// Configuración de Firebase
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROYECTO.firebaseapp.com",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_PROJECT_ID.appspot.com",
    messagingSenderId: "TU_MESSAGING_ID",
    appId: "TU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Función para registrar al usuario
function registrar() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            db.collection("usuarios").doc(user.uid).set({
                email: email,
                fechaRegistro: new Date(),
                tipo: "alquiler"
            });

            // Cambiar a panel de selección de bot
            document.getElementById("registro").style.display = "none";
            document.getElementById("panel").style.display = "block";
        })
        .catch((error) => {
            document.getElementById("mensaje").innerText = error.message;
        });
}

// Mostrar las opciones de alquiler o compra del bot
function mostrarOpciones() {
    let categoria = document.getElementById("categoria").value;
    console.log("Bot seleccionado:", categoria); // Muestra la categoría del bot
    // Cambiar al panel de opciones
    document.getElementById("panel").style.display = "none";
    document.getElementById("opciones").style.display = "block";
}

// Función para redirigir al pago
function irAlPago(opcion) {
    let categoria = document.getElementById("categoria").value;
    let urlPago = `https://www.paypal.com/buy-now?hosted_button_id=TU_BOTON_ID&custom=${categoria}&opcion=${opcion}`;
    window.location.href = urlPago;
}