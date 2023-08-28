const express = require('express');
const cors = require('cors');
const Mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
  })
);

Mongoose.connect(process.env.Mongo_URL);

app.get('/test', (req, res) => {
  res.json('testing');
});

// Registration
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      res.cookie('token', '').json('pass ok');
    } else {
      res.status(422).json('pass not ok');
    }
  } else {
    res.json('user not found');
  }
});

app.listen(3000);