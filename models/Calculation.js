const mongoose = require('mongoose');

const calculationSchema = new mongoose.Schema({
  price: Number,
  tax: Number,
  discount: Number,
  coupon: Number,
  total: Number
}, { timestamps: true });

module.exports = mongoose.model('Calculation', calculationSchema);
