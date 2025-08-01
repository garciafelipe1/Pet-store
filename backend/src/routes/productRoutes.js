// backend/src/routes/productRoutes.js

const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");
const { check, validationResult } = require("express-validator"); // <-- ¡NUEVA LÍNEA!

// Middleware para manejar errores de validación (COPIA DE userRoutes.js)
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = errors
      .array()
      .map((err) => ({ [err.param]: err.msg }));
    return res.status(400).json({ errors: extractedErrors });
  }
  next();
};

// Validaciones para crear un producto
const createProductValidations = [
  check(
    "name",
    "El nombre del producto es requerido y debe ser único"
  ).notEmpty(),
  check("description", "La descripción del producto es requerida").notEmpty(),
  check(
    "price",
    "El precio del producto es requerido y debe ser un número positivo"
  )
    .notEmpty()
    .isNumeric()
    .toFloat() // Convertir a número flotante
    .isFloat({ min: 0 }), // Asegurar que sea flotante y positivo
  check("category", "La categoría del producto es requerida y debe ser válida")
    .notEmpty()
    .isIn(["Alimento", "Juguetes", "Accesorios", "Ropa"]), // Debe coincidir con tu enum
  check(
    "stock",
    "El stock es requerido y debe ser un número entero no negativo"
  )
    .notEmpty()
    .isInt({ min: 0 }), // Asegurar que sea entero y no negativo
  check("imageUrl", "La URL de la imagen no es válida si se proporciona")
    .optional()
    .isURL(),
  check("status", "El estado del producto debe ser un valor booleano")
    .optional()
    .isBoolean(),
];

// Validaciones para actualizar un producto (similares a crear, pero opcionales)
const updateProductValidations = [
  check("name", "El nombre del producto debe ser un string")
    .optional()
    .isString(),
  check(
    "description",
    "La descripción del producto debe ser un string y no exceder los 500 caracteres"
  )
    .optional()
    .isString()
    .isLength({ max: 500 }),
  check("price", "El precio del producto debe ser un número positivo")
    .optional()
    .isNumeric()
    .toFloat()
    .isFloat({ min: 0 }),
  check("category", "La categoría del producto debe ser válida")
    .optional()
    .isIn(["Alimento", "Juguetes", "Accesorios", "Ropa"]),
  check("stock", "El stock debe ser un número entero no negativo")
    .optional()
    .isInt({ min: 0 }),
  check("imageUrl", "La URL de la imagen no es válida").optional().isURL(),
  check("status", "El estado del producto debe ser un valor booleano")
    .optional()
    .isBoolean(),
];

// Rutas para obtener todos los productos y para crear un nuevo producto
router
  .route("/")
  .get(getProducts)
  .post(
    protect,
    admin,
    createProductValidations,
    handleValidationErrors,
    createProduct
  ); // <-- ¡NUEVAS LÍNEAS!

// Rutas para obtener, actualizar y eliminar un producto específico por ID
router
  .route("/:id")
  .get(getProductById)
  .put(
    protect,
    admin,
    updateProductValidations,
    handleValidationErrors,
    updateProduct
  ) // <-- ¡NUEVAS LÍNEAS!
  .delete(protect, admin, deleteProduct);

module.exports = router;
