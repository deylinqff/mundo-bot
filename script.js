document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const messageInput = document.getElementById("message-input");
    const sendBtn = document.getElementById("send-btn");
    const fileBtn = document.getElementById("file-btn");
    const fileInput = document.getElementById("file-input");

    // 🔹 Cargar mensajes guardados en LocalStorage
    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
        messages.forEach(msg => addMessage(msg.text, msg.type, false));
    }

    // 🔹 Guardar mensajes en LocalStorage
    function saveMessages() {
        const messages = [];
        document.querySelectorAll(".message").forEach(msg => {
            messages.push({ text: msg.innerHTML, type: msg.classList.contains("sent") ? "sent" : "received" });
        });
        localStorage.setItem("chatMessages", JSON.stringify(messages));
    }

    // 🔹 Agregar mensaje al chat
    function addMessage(content, type, save = true) {
        const newMessage = document.createElement("div");
        newMessage.classList.add("message", type);
        newMessage.innerHTML = content;
        chatBox.appendChild(newMessage);
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