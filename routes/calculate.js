const express = require('express');
const router = express.Router();
const Calculation = require('../models/Calculation');

// POST /api/calculate
router.post('/', async (req, res) => {
  try {
    const { price, tax, discount, coupon } = req.body;

    // Compute the final total
    const taxAmount = price * (tax / 100);
    const discountAmount = price * (discount / 100);
    const total = price + taxAmount - discountAmount - coupon;

    // Save calculation to DB
    const newCalc = new Calculation({
      price,
      tax,
      discount,
      coupon,
      total
    });

    await newCalc.save();

    // Fetch last 3 entries
    const recent = await Calculation.find().sort({ createdAt: -1 }).limit(3);

    res.json({
      total,
      history: recent
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET /api/calculate/all
router.get('/all', async (req, res) => {
    try {
      const all = await Calculation.find().sort({ createdAt: -1 });
      res.json(all);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving calculations' });
    }
  });
  
module.exports = router;
