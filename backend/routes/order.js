// // const express = require('express');
// // const Order = require('../models/order');
// // const router = express.Router();

// // router.post('/', async (req, res) => {
// //   const { tableNumber, items, totalPrice } = req.body;

// //   if (!tableNumber || !items || !totalPrice) {
// //     return res.status(400).json({ message: 'Missing required fields' });
// //   }

// //   const newOrder = new Order({
// //     tableNumber,
// //     items,
// //     totalPrice,
// //   });

// //   try {
// //     const savedOrder = await newOrder.save();
// //     res.status(201).json(savedOrder);
// //   } catch (error) {
// //     console.error('Error placing order:', error);
// //     res.status(500).json({ message: 'Error placing order', error });
// //   }
// // });

// // router.get('/', async (req, res) => {
// //   try {
// //     const orders = await Order.find();
// //     res.status(200).json(orders);
// //   } catch (error) {
// //     console.error('Error retrieving orders:', error);
// //     res.status(500).json({ message: 'Error retrieving orders', error });
// //   }
// // });

// // module.exports = router;
// const express = require('express');
// const Order = require('../models/order');
// const router = express.Router();

// router.post('/', async (req, res) => {
//   const { tableNumber, items, totalPrice } = req.body;

//   if (!tableNumber || !items || !totalPrice) {
//     return res.status(400).json({ message: 'Missing required fields' });
//   }

//   const newOrder = new Order({
//     tableNumber,
//     items,
//     totalPrice,
//     timestamp: new Date() // Add timestamp
//   });

//   try {
//     const savedOrder = await newOrder.save();
//     res.status(201).json(savedOrder);
//   } catch (error) {
//     console.error('Error placing order:', error);
//     res.status(500).json({ message: 'Error placing order', error });
//   }
// });

// router.get('/', async (req, res) => {
//   try {
//     const orders = await Order.find();
//     res.status(200).json(orders);
//   } catch (error) {
//     console.error('Error retrieving orders:', error);
//     res.status(500).json({ message: 'Error retrieving orders', error });
//   }
// });

// module.exports = router;

const express = require('express');
const Order = require('../models/order');
const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
  const { tableNumber, items, totalPrice } = req.body;

  if (!tableNumber || !items || !totalPrice) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newOrder = new Order({
    tableNumber,
    items,
    totalPrice,
    timestamp: new Date() // Add timestamp
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing order', error });
  }
});

// Retrieve all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ message: 'Error retrieving orders', error });
  }
});

// Update an existing order
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Error updating order', error });
  }
});

module.exports = router;

