// backend/models/Order.js
const mongoose = require("mongoose");
const OrderItemSchema = require("./OrderItem"); // Importamos el esquema OrderItem

const OrderSchema = new mongoose.Schema(
  {
 
    orderItems: [OrderItemSchema],

    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      
    },

    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },


    paymentMethod: {
      type: String,
      required: true,
      enum: [
        "Tarjeta de Crédito",
        "PayPal",
        "Transferencia Bancaria",
        "Efectivo",
      ],
    },

   
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },

    // Estado del pago
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },

    // Estado de la entrega
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },

    // Totales del pedido
    itemsPrice: {
      // Suma de los precios de los productos (sin envío/impuestos)
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      // Impuestos
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
  },
  {
    timestamps: true, // Añade `createdAt` y `updatedAt` automáticamente
  }
);

module.exports = mongoose.models.Order || mongoose.model("Order", OrderSchema);
