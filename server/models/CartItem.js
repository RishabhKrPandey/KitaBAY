const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  image: String,
  price: Number,
});

module.exports = mongoose.model('CartItem', cartItemSchema);
