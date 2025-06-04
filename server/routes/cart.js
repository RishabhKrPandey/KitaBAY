const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const auth = require('../middleware/auth');

// Add to Cart
router.post('/add', auth, async (req, res) => {
  const { title, image, price } = req.body;
  const item = new CartItem({ userId: req.user.userId, title, image, price });
  await item.save();
  res.status(201).json(item);
});

// Get User's Cart
router.get('/', auth, async (req, res) => {
  const items = await CartItem.find({ userId: req.user.userId });
  const total = items.reduce((sum, item) => sum + item.price, 0);
  res.json({ items, total });
});

// Remove from Cart (optional)
router.delete('/:id', auth, async (req, res) => {
  await CartItem.deleteOne({ _id: req.params.id, userId: req.user.userId });
  res.json({ message: 'Item removed' });
});

module.exports = router;
