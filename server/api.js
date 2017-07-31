const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

//*****************GET INVENTORY FROM DATABASE*****************************//

const getInventory = (req, res) => {
  database('inventory').select()
  .then(inventory => {
    inventory.length ? res.status(200).json(inventory) : res.status(404).send('Inventory was not found');
  })
  .catch(error => {
    res.status(500).send(error)
  })
}

const getHistory = (req, res) => {
  database('order_history').select()
  .then(orderHistory => {
    res.status(200).json(orderHistory);
  })
  .catch(error => {
    res.status(500).send(error)
  })
}

const postHistory = (req, res) => {
  const { date, total } = req.body
  console.log(req.body)
  database('order_history').insert({ date, total }, 'id')
  .then(orderData => {
    orderData.length ? res.status(201).send('order recorded in table')
    : res.status(422).send('Unable to record order in table');
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error);
  })
}

module.exports = {
  getInventory,
  getHistory,
  postHistory
}
