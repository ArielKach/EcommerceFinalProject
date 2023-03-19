require('dotenv').config();
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const { mongoConnection } = require("./mongo/mongo-connection");
const WebSocket = require('ws');

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
  const server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });

  const wss = new WebSocket.Server({ server });
  let userCount = 0;
  const usersSet = new Set();
  wss.on('connection', (socket, req) => {

    socket.on('message', (data) => {
      const payload = JSON.parse(data);
      const userId = payload.userId
      if (!usersSet.has(userId)) {
        userCount++;
        usersSet.add(userId)
        socket.on('close', () => {
          userCount--;
          usersSet.delete(userId)
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(userCount.toString());
            }
          });
        });
      }
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(userCount.toString());
        }
      });
    });

  });
})();
