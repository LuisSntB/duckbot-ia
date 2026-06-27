# 🦆Duckbot🦆 — Asistente Web con IA Local

Chatbot conversacional embebido en un sitio web. 
Corre completamente **sin internet ni APIs de pago** gracias a un modelo de lenguaje local, util para trabajar 24/7 en empresas donde se busquen generar citas o cotizaciones breves a cualquier hora agilizando procesos y buscando aumentar los ingresos de las empresas con estas herramientas. 

---

## ¿Qué hace este proyecto?

Un usuario entra a una pagina, ve un botón flotante que dice **"Habla con nosotros"**, lo presiona y puede tener una conversación real con una IA que:

- Le recomienda cosas segun lo requiera
- Le da precios
- Le arma horarios
- Captura sus datos
- **Rechaza** intentos de manipulación, contenido inapropiado y preguntas fuera de tema

Todo esto de manera gratuita y adaptable a cada negocio, generando ganancias ya sea filtrando clientes, ahorrando tiempo a tus trabajadores que usaran ese tiempo para ser mas productivos y no responder a spam y buscando generar un mayor numero de clientes sin importar horarios o de mas.

---

## Arquitectura en una imagen

```
[Navegador del cliente]
        │
        │  Abre http://localhost:5000
        ▼
┌─────────────────────────────────────┐
│         chatbot.py  (FastAPI)       │
│                                     │
│  • Sirve index.html, CSS y JS       │
│  • Recibe mensajes del widget       │
│  • Filtra ataques y contenido       │
│  • Construye el historial           │
│  • Llama al modelo de IA local      │
└──────────────┬──────────────────────┘
               │
               │  http://localhost:11434
               ▼
┌─────────────────────────────────────┐
│         Ollama  (local)             │
│         Modelo: hermes3             │
│                                     │
│  Corre en local.           │
│  No manda datos a internet.         │
└─────────────────────────────────────┘
```

---

## Archivos del proyecto

```
transtour-chatbot/
│
├── chatbot.py            ← El cerebro: servidor web + lógica de IA
├── empresa_config.json   ← La personalidad del bot
├── index.html            ← El sitio web con el widget de chat integrado
├── styles.css            ← Los estilos visuales del sitio y del chat
├── script.js             ← El código que anima el widget y habla con el backend
│
├── requirements.txt      ← Lista de librerías Python necesarias
├── .gitignore            
└── docs/
    └── AREAS_DE_MEJORA.md     ← Siguientes mejoras
```

---

## Instalación rápida

```bash
# 1. Instalar dependencias Python
pip install -r requirements.txt

# 2. Tener Ollama corriendo con el modelo hermes3
ollama run hermes3

# 3. Iniciar el servidor
python chatbot.py

# 4. Abrir en el navegador
# http://localhost:5000
```

---

## Tecnologías usadas

| Concepto| Herramienta |
|----------|-------------|
| Servidor web / API | FastAPI + Uvicorn |
| Modelo de IA | Hermes 3 vía Ollama |
| Frontend del sitio | HTML, CSS, JavaScript|
| Iconos | Font Awesome 6 |
| Configuración del bot | JSON|

---

## Cosas interesantes

**Sistema de seguridad** — el bot tiene dos filtros de protección:

1. **Filtro de entrada:** Antes de que el mensaje llegue a la IA, se revisa con expresiones regulares. Si detecta intentos de manipulación (`"ignora tus instrucciones"`, `"soy el admin"`, `"DAN mode"`) o contenido inapropiado, responde automáticamente sin consultar al modelo.

2. **Filtro de salida:** Aunque el modelo genere una respuesta, antes de enviarla al usuario se verifica que no contenga palabras prohibidas. Si las contiene, se reemplaza por una respuesta segura.

**IA sin internet** — el modelo corre en Ollama, directamente en la máquina donde está el servidor. Ningún mensaje del usuario sale de la red local.

**Configuración sin código** — toda la lógica de negocio vive en `empresa_config.json`. Para adaptar el bot a otra empresa, solo se edita ese archivo.
