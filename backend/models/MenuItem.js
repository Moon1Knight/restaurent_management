// models/MenuItem.js
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  category: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true },
      priceHalf: { type: Number, required: true },
      priceFull: { type: Number, required: true },
      unavailable: { type: Boolean, default: false }
    }
  ]
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
