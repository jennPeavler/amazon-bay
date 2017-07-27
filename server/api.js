const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

//*****************GET INVENTORY FROM DATABASE*****************************//

const getInventory = (req, res) => {
  database('inventory').select()
  .then(inventory => {
    res.status(200).json(inventory);
  })
  .catch(error => {
    res.status(500).send(error)
  })
}

module.exports = {
  getInventory
}
