// backend/src/models/product.js

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del producto es requerido"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "La descripción del producto es requerida"],
      maxlength: [500, "La descripción no puede exceder los 500 caracteres"],
    },
    price: {
      type: Number,
      required: [true, "El precio del producto es requerido"],
      min: [0, "El precio no puede ser negativo"],
    },
    category: {
      type: String,
      required: [true, "La categoría del producto es requerida"],
      enum: ["Alimento", "Juguetes", "Accesorios", "Ropa"],
    },
    stock: {
      type: Number,
      required: [true, "El stock es obligatorio"],
      min: [0, "El stock no puede ser negativo"],
      default: 0,
    },
    imageUrl: {
      type: String,
      required: false,
      default: "no-image.jpg",
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true, // Opcional, pero recomendado
  }
);

// ¡Esta es la línea clave!
// Usa `mongoose.models.Product` para obtener el modelo si ya existe,
// o crea un nuevo modelo si no. Esto evita el OverwriteModelError y define 'Product'.
module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);
