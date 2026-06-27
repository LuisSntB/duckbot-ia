# Errores y mejoras

## Errores actuales

### 1. El `session_id` es el mismo para todos los usuarios

El problema es que al hablar dos personas la mismo tiempo toma los inputs de los dos y puede mezclarlos creando respuestas erroneas, esto se dejo asi ahora para probar la memoria y otras funciones del modelo de IA, cosa que se quitara en futuras actualizaciones, agregando UUIDs unicas a cada sesion de chat.

**Cómo se arregla:**
```javascript
// Generar un ID único por pestaña del navegador
const sessionId = sessionStorage.getItem('chat_id') || crypto.randomUUID();
sessionStorage.setItem('chat_id', sessionId);
```

**Prioridad:**  Alta - Se necesita precision en las respuestas

---

### 2. La memoria se borra si el servidor se reinicia

El historial de conversaciones vive en la memoria RAM del servidor. Si el servidor se apaga o se reinicia, todas las conversaciones se pierden.

**Cómo se arregla:** Guardar las sesiones en una base de datos donde persistan por un tiempo antes de ser eliminadas automaticamente.

**Prioridad:**  Media — hasta llevar el proyecto a produccion.

---

### 3. El indicador "Pensando..." podria tener animacion

 Mientras el modelo genera la respuesta tarda unos segundos, el usuario ve el texto estático. En WhatsApp usan animaciones simples para indicar que se esta escribiendo una respuesta. 

**Cómo se arregla:** Un poco de CSS con animación:
```css
.typing-dot { animation: blink 1s infinite; }
```

**Prioridad:** Baja — solo Visual

---

### 4. Sin límite de uso por usuario

Cualquier usuario podría mandar miles de mensajes automáticamente y saturar el modelo, esto es asi para probar cosas ahora, cosa que en produccion se corregiria limitando mensajes por cierto tiempo.

**Cómo se arregla:** Implementar rate limiting establecer un limite de mensajes por IP en un periodo de tiempo.

**Prioridad:**  Media — Antes de subir a produccion.

---

## Mejoras

### Botones de respuesta rápida
Después del mensaje de bienvenida, mostrar opciones seleccionables para que el usuario no tenga que escribir:

```
[ 🚌 Cotizar ]  [ 📍 Destinos ]  [ 👤 Asesoria ]
```

---

### Escritura progresiva
En lugar de esperar a que el modelo termine de generar todo el texto y entonces mostrarlo de golpe, mostrarlo letra por letra mientras se genera.

---

### Panel para ventas
Una página interna (`/admin`) donde el equipo de ventas pueda ver todas las conversaciones y los leads capturados, sin necesidad de revisar la terminal, asi facilitando su trabajo.

---

### Captura de datos y correos
Cuando el bot capture el correo y WhatsApp del usuario, enviar automáticamente un correo a `ventas@transtour.com.mx` con el resumen de lo que pidió y hacerle saber que tiene que trabajar con ese  cliente.

---

