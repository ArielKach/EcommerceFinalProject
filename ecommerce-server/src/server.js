require('dotenv').config();
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const { mongoConnection } = require("./mongo/mongo-connection");

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}));

(async () => {
  await mongoConnection();
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
})();
