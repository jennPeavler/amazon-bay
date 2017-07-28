const express = require('express');
const router = express.Router();
const api = require('./api')

router.get('/inventory', api.getInventory)
router.get('/order_history', api.getHistory)

router.post('/order_history', api.postHistory)

module.exports = router;
