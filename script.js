document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    dropdown.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
            dropdown.classList.add('open');
        }
    });

    dropdown.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            dropdown.classList.remove('open');
        }
    });

    dropdownToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault(); 
            dropdown.classList.toggle('open');
        }
    });

    const navLinks = document.querySelectorAll('.nav-menu a:not(.dropdown-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            dropdown.classList.remove('open');
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - 120)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    const chatToggle = document.getElementById('chat-toggle');
    const chatClose = document.getElementById('chat-close');
    const chatWindow = document.getElementById('chat-window');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    if(chatToggle) {
        chatToggle.addEventListener('click', () => {
            chatWindow.style.display = 'flex';
            chatToggle.style.display = 'none';
            chatInput.focus();
        });

        chatClose.addEventListener('click', () => {
            chatWindow.style.display = 'none';
            chatToggle.style.display = 'flex';
        });

        function appendMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', `${sender}-message`);
            messageDiv.innerText = text;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight; 
        }

        async function handleSendMessage() {
            const text = chatInput.value.trim();
            if (!text) return;

            appendMessage(text, 'user');
            chatInput.value = '';

            appendMessage("Pensando...", 'bot');
            const tempBotMessage = chatMessages.lastChild;
            try {
                const respuestaIA = await enviarAlBackend(text);
                tempBotMessage.innerText = respuestaIA;
            } catch (error) {
                tempBotMessage.innerText = "Error de conexión con el ecosistema de IA local.";
            }
        }

        chatSend.addEventListener('click', handleSendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSendMessage();
        });
    }

    async function enviarAlBackend(mensajeUsuario) {
        try {
                const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ 
                    message: mensajeUsuario,
                    session_id: "user_session_01"
                })
            });

            if (!response.ok) {
                throw new Error("Respuesta errónea por parte del servidor.");
            }

            const data = await response.json();
            return data.response;

        } catch (error) {
            console.error("Error al conectar con chatbot.py:", error);
            throw error;
        }
    }
});