// routes/trades.js
const express = require('express');
const router = express.Router();
const tradesController = require('../controllers/trades');

// Create a new trade
router.post('/', tradesController.createTrade);

// Get all trades
router.get('/', tradesController.getAllTrades);

// Get a trade by ID
router.get('/:id', tradesController.getTradeById);

// Handle unsupported HTTP methods
router.delete('/:id', tradesController.notAllowed);
router.put('/:id', tradesController.notAllowed);
router.patch('/:id', tradesController.notAllowed);

module.exports = router;
