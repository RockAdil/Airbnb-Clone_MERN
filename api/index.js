const express = require('express');
var cookieParser = require('cookie-parser');
const cors = require('cors');
const Mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fasadddf32hjldad33adja';

app.use(express.json());
app.use(cookieParser());
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
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        }
      );
    } else {
      res.status(422).json('pass not ok');
    }
  } else {
    res.json('user not found');
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { _id, name, email } = await User.findById(userData.id);
      res.json({ _id, name, email });
    });
  } else {
    res.json(null);
  }
});

app.listen(3000);
