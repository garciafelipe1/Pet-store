const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db/db.js");
const session = require("express-session");
const passport = require("./config/passport");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

// Conectar a la base de datos
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Configuración de sesión
app.use(session({
  secret: "clave-super-secreta",
  resave: false,
  saveUninitialized: true,
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.get("/", (req, res) => {
  res.send("API está corriendo...");
});
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

// Middleware 404
app.use((req, res, next) => {
  const error = new Error(`No se encontró la ruta - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Middleware de errores
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
