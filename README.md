# API con Express.js — To-Do API

API RESTful básica creada con **Node.js** y **Express.js** para gestionar una lista de tareas mediante operaciones **CRUD (Crear, Leer, Actualizar y Eliminar)**.  

---

## ⚙️ Instalación y ejecución

1. Asegúrate de tener **Node.js**.  
2. Descarga o clona el proyecto.  
3. Instala las dependencias con:

   npm install

4. Inicia el servidor:

   npm start

5. Abre Postman y usa la dirección base `http://localhost:3000`.

---

## 🗂️ Estructura del proyecto

express-todo-api/
├─ index.js       → Servidor principal Express
├─ routes.js      → Definición de rutas y lógica CRUD
├─ data.js        → Fuente de datos (array de tareas)
├─ package.json   → Dependencias y scripts npm
└─ README.md      → Documentación del proyecto

---

## 📘 Modelo de datos (tareas)
Cada tarea tiene la siguiente estructura:
```json
{
  "id": 1,
  "titulo": "Estudiar Express.js",
  "descripcion": "Leer apuntes semana 4",
  "completada": false
}
```

---

## Endpoints y pruebas con Postman

### 1 GET `/`
**Objetivo:** Comprobar el estado general de la API.

- Método: **GET**
- URL: `http://localhost:3000/`
- En Postman: crear una nueva solicitud con este método y URL, presionar **Send**.

**Respuesta esperada (200):**
```json
{
  "ok": true,
  "message": "API de Tareas (Express.js) - Semana 4",
  "endpoints": ["/tasks (GET, POST)", "/tasks/:id (GET, PUT, DELETE)"]
}
```

---

### 2️ GET `/tasks`
**Objetivo:** Obtener la lista completa de tareas.

- Método: **GET**
- URL: `http://localhost:3000/tasks`
- En Postman: crear solicitud, presionar **Send**.

**Respuesta esperada (200):**
```json
{
  "ok": true,
  "data": [
    { "id": 1, "titulo": "Estudiar Express.js", "descripcion": "Leer apuntes semana 4", "completada": false },
    { "id": 2, "titulo": "Preparar README", "descripcion": "Agregar ejemplos de pruebas", "completada": false }
  ]
}
```

---

### 3️ GET `/tasks/:id`
**Objetivo:** Consultar una tarea específica según su ID.

- Método: **GET**
- URL de ejemplo: `http://localhost:3000/tasks/1`
- En Postman: reemplazar `:id` por un número real y presionar **Send**.

**Respuesta esperada (200):**
```json
{
  "ok": true,
  "data": { "id": 1, "titulo": "Estudiar Express.js", "descripcion": "Leer apuntes semana 4", "completada": false }
}
```

**Si el ID no existe (404):**
```json
{ "ok": false, "error": "Tarea no encontrada" }
```

---

### 4️ POST `/tasks`
**Objetivo:** Crear una nueva tarea.

- Método: **POST**
- URL: `http://localhost:3000/tasks`
- En Postman:
  - Ir a la pestaña **Body**
  - Seleccionar **raw**
  - Elegir **JSON** como tipo
  - Escribir el siguiente cuerpo:

```json
{
  "titulo": "Practicar CRUD",
  "descripcion": "Probar operaciones POST y GET",
  "completada": false
}
```

**Respuesta esperada (201):**
```json
{
  "ok": true,
  "data": {
    "id": 3,
    "titulo": "Practicar CRUD",
    "descripcion": "Probar operaciones POST y GET",
    "completada": false
  }
}
```

**Si falta un campo o tipo incorrecto (400):**
```json
{
  "ok": false,
  "error": "Datos inválidos",
  "details": ["El campo 'titulo' es obligatorio y debe ser texto."]
}
```

---

### 5️ PUT `/tasks/:id`
**Objetivo:** Actualizar una tarea existente.

- Método: **PUT**
- URL: `http://localhost:3000/tasks/1`
- En Postman:
  - Pestaña **Body → raw → JSON**
  - Ejemplo de cuerpo:

```json
{
  "completada": true,
  "descripcion": "Leído y practicado"
}
```

**Respuesta esperada (200):**
```json
{
  "ok": true,
  "data": {
    "id": 1,
    "titulo": "Estudiar Express.js",
    "descripcion": "Leído y practicado",
    "completada": true
  }
}
```

**Errores comunes:**
- 404 si el ID no existe.
- 400 si el cuerpo está vacío o con tipos erróneos.

---

### 6️ DELETE `/tasks/:id`
**Objetivo:** Eliminar una tarea.

- Método: **DELETE**
- URL: `http://localhost:3000/tasks/2`
- En Postman: crea la solicitud, presiona **Send**.

**Respuesta esperada (200):**
```json
{
  "ok": true,
  "data": {
    "id": 2,
    "titulo": "Preparar README",
    "descripcion": "Agregar ejemplos de pruebas",
    "completada": false
  }
}
```

**Si no existe (404):**
```json
{ "ok": false, "error": "Tarea no encontrada" }
```

---

##  Guía de pruebas en Postman

1. Abre Postman y crea una colección llamada **API Tareas**.  
2. Agrega las cinco solicitudes (GET, POST, PUT, DELETE) indicadas arriba.  
3. Asegúrate de que todas apunten a `http://localhost:3000`.  
4. En los métodos POST y PUT, utilizar la pestaña **Body → raw → JSON** para enviar datos.  
5. Presionar **Send** en cada prueba y revisar las respuestas JSON.  
6. Verificar que los códigos de estado sean correctos (200, 201, 400, 404).  

---

## Decisiones de diseño

- Los datos se mantienen en memoria dentro de `data.js`, sin base de datos.  
- Los identificadores (`id`) se generan automáticamente (`max(id) + 1`).  
- Se aplican validaciones básicas para asegurar integridad de los datos.  
- Las respuestas tienen un formato uniforme:  
  - Éxito → `{ ok: true, data: ... }`  
  - Error → `{ ok: false, error: "mensaje", details?: [...] }`.

