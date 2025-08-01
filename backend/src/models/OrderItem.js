const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", 
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "La cantidad debe ser al menos 1"],
  },
  price: {
    
    type: Number,
    required: true,
  },
  imageUrl: {

    type: String,
  },
});

module.exports = OrderItemSchema;

