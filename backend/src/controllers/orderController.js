// backend/controllers/orderController.js
const Order = require("../models/order");
const Product = require("../models/Product"); // Para verificar el stock

// @desc    Crear un nuevo pedido
// @route   POST /api/orders
// @access  Private (se asume que el usuario está autenticado y su ID está en req.user._id)
const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ message: "No hay ítems en el pedido" });
      return;
    } else {
      // Opcional: Podrías verificar el stock de cada producto aquí
      // Antes de crear el pedido, itera sobre orderItems y verifica si Product.stock es suficiente
      // Si no hay suficiente stock, podrías devolver un error 400.
      // Por simplicidad, lo omitimos en este ejemplo, pero es CRUCIAL para una tienda real.

      const order = new Order({
        orderItems: orderItems.map((item) => ({
          ...item,
          product: item._id, // Mapea el _id del frontend al campo 'product' para la referencia
        })),
        user: req.user ? req.user._id : null, // Asume que req.user contiene la información del usuario autenticado
        // Si no hay autenticación aún, puedes quitar 'user: req.user._id'
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder); // 201 Created
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error del servidor al crear el pedido",
        error: error.message,
      });
  }
};

// @desc    Obtener pedido por ID
// @route   GET /api/orders/:id
// @access  Private (solo el usuario que hizo el pedido o admin)
const getOrderById = async (req, res) => {
  try {
    // Populate 'user' con el nombre y email, y 'orderItems.product' con el nombre del producto
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("orderItems.product", "name"); // Puedes añadir más campos del producto si los necesitas

    if (order) {
      // Opcional: Asegúrate de que solo el dueño del pedido o un admin puedan verlo
      // if (order.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      //   res.status(401).json({ message: 'No autorizado para ver este pedido' });
      //   return;
      // }
      res.json(order);
    } else {
      res.status(404).json({ message: "Pedido no encontrado" });
    }
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "ID de pedido inválido" });
    }
    res
      .status(500)
      .json({ message: "Error del servidor al obtener el pedido" });
  }
};

// @desc    Actualizar pedido a pagado
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      // paymentResult vendría de la pasarela de pago (ej. PayPal)
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Pedido no encontrado" });
    }
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "ID de pedido inválido" });
    }
    res
      .status(500)
      .json({ message: "Error del servidor al actualizar el pago del pedido" });
  }
};

// @desc    Obtener todos los pedidos de un usuario logueado
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    // Asume que req.user._id contiene el ID del usuario autenticado
    const orders = await Order.find({ user: req.user._id }); // Filtrar por ID de usuario
    res.json(orders);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error del servidor al obtener mis pedidos" });
  }
};

// @desc    Actualizar pedido a entregado (Admin solamente)
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin (Necesitarías un middleware para verificar si es admin)
const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Pedido no encontrado" });
    }
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "ID de pedido inválido" });
    }
    res
      .status(500)
      .json({
        message: "Error del servidor al actualizar la entrega del pedido",
      });
  }
};

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  updateOrderToDelivered,
};
