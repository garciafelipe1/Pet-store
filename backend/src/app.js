// backend/src/app.js

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db/db.js");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
// Conectar a la base de datos
connectDB();

const app = express();

// Middlewares
app.use(express.json()); // Para parsear el body de las peticiones JSON
app.use(cors()); // Para habilitar CORS

// Rutas de la API
app.get("/", (req, res) => {
  res.send("API está corriendo...");
});
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);



// Middleware para manejar rutas 404 (Not Found)
// Este se activa si ninguna ruta anterior ha manejado la petición
app.use((req, res, next) => {
  const error = new Error(`No se encontró la ruta - ${req.originalUrl}`);
  res.status(404); // Establece el status a 404
  next(error); // Pasa el error al siguiente middleware de manejo de errores
});

// Middleware de manejo de errores general
// Este middleware se activa cuando next(error) es llamado desde cualquier lugar
app.use((err, req, res, next) => {
  
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode); // Establece el status de la respuesta

  // Envía una respuesta JSON con el mensaje de error
  res.json({
    message: err.message,
   
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});




const PORT = process.env.PORT || 3000; 



app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
