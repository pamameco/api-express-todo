export const tareas = [
  {
    "id": 1,
    "titulo": "Estudiar Express.js",
    "descripcion": "Leer apuntes semana 4",
    "completada": false
  },
  {
    "id": 2,
    "titulo": "Preparar README",
    "descripcion": "Agregar ejemplos para Postman",
    "completada": false
  },
  {
    "id": 3,
    "titulo": "Subir a Git",
    "descripcion": "Cargado GIT",
    "completada": true
  }
];

export function nextId(items) {
  if (!Array.isArray(items) || items.length === 0) return 1;
  return Math.max(...items.map(t => t.id)) + 1;
}