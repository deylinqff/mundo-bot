import config from './config.js';

document.addEventListener("DOMContentLoaded", function () { 
    const chatBox = document.getElementById("chat-box"); 
    const messageInput = document.getElementById("message-input"); 
    const sendBtn = document.getElementById("send-btn"); 
    const fileBtn = document.getElementById("file-btn"); 
    const fileInput = document.getElementById("file-input");

    console.log("Correos de administradores:", config.adminEmails);

    const userEmail = prompt("Ingresa tu correo:");

    if (config.adminEmails.includes(userEmail)) {
        document.body.classList.add("show-delete");
    }

    // 🔹 Cargar mensajes guardados en LocalStorage
    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
        messages.forEach(msg => addMessage(msg.text, msg.type, false));
    }

    // 🔹 Guardar mensajes en LocalStorage
    function saveMessages() {
        const messages = [];
        document.querySelectorAll(".message-container").forEach(container => {
            messages.push({
                text: container.querySelector(".message").innerHTML,
                type: container.querySelector(".message").classList.contains("sent") ? "sent" : "received"
            });
        });
        localStorage.setItem("chatMessages", JSON.stringify(messages));
    }

    // 🔹 Agregar mensaje al chat
    function addMessage(content, type, save = true) {
        const container = document.createElement("div");
        container.classList.add("message-container");

        const newMessage = document.createElement("div");
        newMessage.classList.add("message", type);
        newMessage.innerHTML = content;

        container.appendChild(newMessage);

        // 🔹 Si el usuario es admin, agregar botón de eliminar
        if (config.adminEmails.includes(userEmail)) {
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn");
            deleteBtn.innerHTML = "🗑️";
            deleteBtn.addEventListener("click", function () {
                container.remove();
                saveMessages();
            });
            container.appendChild(deleteBtn);
        }

        chatBox.appendChild(container);
        chatBox.scrollTop = chatBox.scrollHeight;

        if (save) saveMessages();
    }

    // 🔹 Enviar mensaje de texto
    sendBtn.addEventListener("click", function () {
        const message = messageInput.value.trim();
        if (message !== "") {
            addMessage(message, "sent");
            messageInput.value = "";
        }
    });

    // 🔹 Enviar imagen o video
    fileBtn.addEventListener("click", function () {
        fileInput.click();
    });

    fileInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                let content = "";
                if (file.type.startsWith("image")) {
                    content = `<img src="${e.target.result}" alt="Imagen">`;
                } else if (file.type.startsWith("video")) {
                    content = `<video controls><source src="${e.target.result}" type="${file.type}"></video>`;
                }
                addMessage(content, "sent");
            };
            reader.readAsDataURL(file);
        }
    });

    // 🔹 Cargar mensajes al iniciar
    loadMessages();
});