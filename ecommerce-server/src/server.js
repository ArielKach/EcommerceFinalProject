require('dotenv').config();
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const { initMongoConnection } = require("./mongo/mongo-connection");

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}));

// app.post('/api/users', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const userCredential = await auth.createUserWithEmailAndPassword(email, password);
//     const user = userCredential.user;

//     res.status(201).json({ uid: user.uid });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to create user' });
//   }
// });

(async () => {
  await initMongoConnection();
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
})();
