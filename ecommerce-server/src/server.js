require('dotenv').config();
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const { mongoConnection } = require("./mongo/mongo-connection");

// Routes
const product = require('./routes/product');
const cart = require('./routes/cart');
const order = require('./routes/order');
const category = require('./routes/category');

const app = express()
const PORT = 3001

app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}));


app.use('/api/product', product);
app.use('/api/cart', cart);
app.use('/api/order', order);
app.use('/api/carts/delete-product', cart);
app.use('/api/category', category);

(async () => {
  await mongoConnection();
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
})();
