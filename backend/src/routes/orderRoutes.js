// backend/src/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  updateOrderToDelivered, // Asegúrate de que esta función esté desestructurada aquí
} = require("../controllers/orderController");

// Middleware de autenticación (ejemplo) - mantenlos comentados si aún no tienes autenticación
// const { protect, admin } = require('../middleware/authMiddleware');

router.route("/").post(addOrderItems); // .post(protect, addOrderItems);
router.route("/myorders").get(getMyOrders); // .get(protect, getMyOrders);
router.route("/:id").get(getOrderById); // .get(protect, getOrderById);
router.route("/:id/pay").put(updateOrderToPaid); // .put(protect, updateOrderToPaid);

// ¡AQUÍ ESTÁ LA CORRECCIÓN! Usar 'updateOrderToDelivered' directamente
router.route("/:id/deliver").put(updateOrderToDelivered); // .put(protect, admin, updateOrderToDelivered);

module.exports = router;
