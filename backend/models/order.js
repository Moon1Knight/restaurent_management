const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  tableNumber: {
    type: String,
    required: true,
  },
  items: [
    {
      name: String,
      isHalf: Boolean,
      price: Number,
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
