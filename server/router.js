const express = require('express');
const router = express.Router();
const api = require('./api')

router.get('/inventory', api.getInventory)

module.exports = router;
