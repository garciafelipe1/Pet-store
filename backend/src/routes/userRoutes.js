// backend/src/routes/userRoutes.js

const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { check, validationResult } = require("express-validator"); // <-- ¡NUEVA LÍNEA!

// Middleware para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Mapea los errores para una respuesta más limpia y clara
    const extractedErrors = errors
      .array()
      .map((err) => ({ [err.param]: err.msg }));
    return res.status(400).json({ errors: extractedErrors });
  }
  next(); // Si no hay errores, pasa al siguiente middleware/controlador
};

// Rutas Públicas (no requieren autenticación)

// Validaciones para el registro de usuario
router.post(
  "/register",
  [
    check("name", "El nombre es requerido y debe tener al menos 3 caracteres")
      .notEmpty()
      .isLength({ min: 3 }),
    check("email", "Por favor, incluye un email válido").isEmail(),
    check(
      "password",
      "La contraseña debe tener al menos 6 caracteres"
    ).isLength({ min: 6 }),
  ],
  handleValidationErrors, // <-- ¡NUEVA LÍNEA! Middleware de manejo de errores
  registerUser // Controlador
);

// Validaciones para el login de usuario
router.post(
  "/login",
  [
    check("email", "Por favor, incluye un email válido").isEmail(),
    check("password", "La contraseña es requerida").notEmpty(),
  ],
  handleValidationErrors, // <-- ¡NUEVA LÍNEA! Middleware de manejo de errores
  loginUser // Controlador
);

// Ruta Protegida (requiere que el usuario esté autenticado)
router.get("/profile", protect, getUserProfile);

module.exports = router;
