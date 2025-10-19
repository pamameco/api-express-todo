import { Router } from "express";
import { tareas, nextId } from "./data.js";
import fs from "fs";

export const router = Router();

function guardarTareas() {
  const contenido = `export const tareas = ${JSON.stringify(tareas, null, 2)};\n\n` +
                    `export function nextId(items) {\n` +
                    `  if (!Array.isArray(items) || items.length === 0) return 1;\n` +
                    `  return Math.max(...items.map(t => t.id)) + 1;\n` +
                    `}`;
  fs.writeFileSync("./data.js", contenido, "utf8");
}

function validateCreate(body) {
  const errors = [];
  if (typeof body.titulo !== "string" || body.titulo.trim() === "") {
    errors.push("El campo 'titulo' es obligatorio y debe ser texto.");
  }
  if (typeof body.descripcion !== "undefined" && typeof body.descripcion !== "string") {
    errors.push("El campo 'descripcion' (si se envía) debe ser texto.");
  }
  if (typeof body.completada !== "undefined" && typeof body.completada !== "boolean") {
    errors.push("El campo 'completada' (si se envía) debe ser boolean.");
  }
  return errors;
}

function validateUpdate(body) {
  const errors = [];
  if ("titulo" in body && (typeof body.titulo !== "string" || body.titulo.trim() === "")) {
    errors.push("Si se envía, 'titulo' debe ser texto no vacío.");
  }
  if ("descripcion" in body && typeof body.descripcion !== "string") {
    errors.push("Si se envía, 'descripcion' debe ser texto.");
  }
  if ("completada" in body && typeof body.completada !== "boolean") {
    errors.push("Si se envía, 'completada' debe ser boolean.");
  }
  if (Object.keys(body).length === 0) {
    errors.push("Debes enviar al menos un campo para actualizar.");
  }
  return errors;
}

router.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "API de Tareas (Express.js) - Semana 4",
    endpoints: ["/tasks (GET, POST)", "/tasks/:id (GET, PUT, DELETE)"]
  });
});

router.get("/tasks", (req, res) => {
  res.json({ ok: true, data: tareas });
});

router.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const tarea = tareas.find(t => t.id === id);
  if (!tarea) {
    return res.status(404).json({ ok: false, error: "Tarea no encontrada" });
  }
  res.json({ ok: true, data: tarea });
});

router.post("/tasks", (req, res) => {
  const errors = validateCreate(req.body || {});
  if (errors.length) {
    return res.status(400).json({ ok: false, error: "Datos inválidos", details: errors });
  }

  const nueva = {
    id: nextId(tareas),
    titulo: req.body.titulo.trim(),
    descripcion: typeof req.body.descripcion === "string" ? req.body.descripcion : "",
    completada: typeof req.body.completada === "boolean" ? req.body.completada : false
  };
  tareas.push(nueva);
  guardarTareas();
  res.status(201).json({ ok: true, data: nueva });
});

router.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = tareas.findIndex(t => t.id === id);
  if (idx === -1) {
    return res.status(404).json({ ok: false, error: "Tarea no encontrada" });
  }

  const errors = validateUpdate(req.body || {});
  if (errors.length) {
    return res.status(400).json({ ok: false, error: "Datos inválidos", details: errors });
  }

  const actual = tareas[idx];
  const updated = {
    ...actual,
    ...( "titulo" in req.body ? { titulo: req.body.titulo.trim() } : {} ),
    ...( "descripcion" in req.body ? { descripcion: req.body.descripcion } : {} ),
    ...( "completada" in req.body ? { completada: req.body.completada } : {} )
  };
  tareas[idx] = updated;
  guardarTareas();
  res.json({ ok: true, data: updated });
});

router.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = tareas.findIndex(t => t.id === id);
  if (idx === -1) {
    return res.status(404).json({ ok: false, error: "Tarea no encontrada" });
  }
  const eliminada = tareas.splice(idx, 1)[0];
  guardarTareas();
  res.json({ ok: true, data: eliminada });
});