// controller/trades.js
const Trade = require('../models/trades');

// Create a new trade
exports.createTrade = async (req, res) => {
  try {
    const trade = await Trade.create(req.body);
    res.status(201).json(trade);
  } catch (error) {
    res.status(400).json({ error: 'Invalid trade data' });
  }
};

// Get all trades based on query parameters
exports.getAllTrades = async (req, res) => {
  try {
    const { user_id, type } = req.query;
    let trades = await Trade.findAll();

    if (user_id && type) {
      // Filter trades by user_id and type if both query parameters are present
      trades = trades.filter(trade => trade.user_id === parseInt(user_id, 10) && trade.type === type);
    } else if (user_id) {
      // Filter trades by user_id if only user_id query parameter is present
      trades = trades.filter(trade => trade.user_id === parseInt(user_id, 10));
    } else if (type) {
      // Filter trades by type if only type query parameter is present
      trades = trades.filter(trade => trade.type === type);
    } 

    res.status(200).send(trades);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get a trade by ID
exports.getTradeById = async (req, res) => {
  const { id } = req.params;
  try {
    const trade = await Trade.findByPk(id);
    if (!trade) {
      // Return plain text "ID not found" response
      res.status(404).send("ID not found");
    } else {
      res.status(200).json(trade);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Handle unsupported HTTP methods
exports.notAllowed = (req, res) => {
  res.status(405).json({ error: 'Method not allowed' });
};
