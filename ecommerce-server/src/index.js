require('dotenv').config();
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})