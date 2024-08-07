// routes/menu.js
const express = require('express');
const router = express.Router();
// const MenuItem = require('../models/MenuItem');
const MenuItem = require('../models/MenuItem')

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new item
router.post('/', async (req, res) => {
  const { category, items } = req.body;
  try {
    const menuItem = await MenuItem.findOneAndUpdate(
      { category },
      { $push: { items } },
      { new: true, upsert: true }
    );
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update item availability
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { unavailable } = req.body;

  try {
    const menuItem = await MenuItem.findOneAndUpdate(
      { "items._id": id },
      { $set: { "items.$.unavailable": unavailable } },
      { new: true }
    );
    res.json(menuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an item
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const menuItem = await MenuItem.findOneAndUpdate(
      { "items._id": id },
      { $pull: { items: { _id: id } } },
      { new: true }
    );
    res.json(menuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
