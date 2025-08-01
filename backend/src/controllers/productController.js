// backend/src/controllers/productController.js

const Product = require("../models/product");

// @desc    Obtener todos los productos
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    // Encuentra todos los productos en la base de datos
    // .populate('user', 'name email') es opcional si quieres incluir info del usuario que lo creó
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener los productos.",
        error: error.message,
      });
  }
};

// @desc    Obtener un producto por ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Producto no encontrado." });
    }
  } catch (error) {
    
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "ID de producto inválido." });
    }
    res
      .status(500)
      .json({ message: "Error al obtener el producto.", error: error.message });
  }
};

// @desc    Crear un nuevo producto
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  // req.user viene del middleware 'protect' y contiene el usuario autenticado
  // req.user._id será el ID del administrador que crea el producto
  const { name, description, price, category, stock, imageUrl, status } =
    req.body;

  try {
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl,
      status,
      user: req.user._id, // Asigna el ID del usuario (admin) que lo crea
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct); // 201 Created
  } catch (error) {
    // Manejo de errores de validación de Mongoose o campos duplicados (ej. nombre único)
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    if (error.code === 11000) {
      
      return res
        .status(400)
        .json({ message: "Ya existe un producto con ese nombre." });
    }
    res
      .status(500)
      .json({ message: "Error al crear el producto.", error: error.message });
  }
};

// @desc    Actualizar un producto existente
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  const { name, description, price, category, stock, imageUrl, status } =
    req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name; // Si el campo no se envía, mantiene el valor existente
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;
      product.stock = stock !== undefined ? stock : product.stock; // Para permitir stock 0
      product.imageUrl = imageUrl || product.imageUrl;
      product.status = status !== undefined ? status : product.status; // Para permitir status false

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Producto no encontrado." });
    }
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "ID de producto inválido." });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    if (error.code === 11000) {
      // Error de clave duplicada (para 'name' unique)
      return res
        .status(400)
        .json({ message: "Ya existe un producto con ese nombre." });
    }
    res
      .status(500)
      .json({
        message: "Error al actualizar el producto.",
        error: error.message,
      });
  }
};

// @desc    Eliminar un producto
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne(); // Usar deleteOne() o remove()
      res.json({ message: "Producto eliminado correctamente." });
    } else {
      res.status(404).json({ message: "Producto no encontrado." });
    }
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "ID de producto inválido." });
    }
    res
      .status(500)
      .json({
        message: "Error al eliminar el producto.",
        error: error.message,
      });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
