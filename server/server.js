const express = require('express');
const path = require('path');
const router = require('./router');
const bodyParser = require('body-parser');

const port = (process.env.PORT || 3000);
const app = express();


app.use(bodyParser.json());

app.use('/assets', express.static(path.join(__dirname, '../client/assets/')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`amazon-bay server listening on port ${port}!`);
});

module.exports = app;
