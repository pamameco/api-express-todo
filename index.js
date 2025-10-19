import express from "express";
import { router } from "./routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/", router);

app.use((req, res, next) => {
  res.status(404).json({ ok: false, error: "Ruta no encontrada" });
});

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ ok: false, error: "Error interno del servidor" });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});