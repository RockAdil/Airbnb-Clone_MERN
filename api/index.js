const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Place = require('./models/Place');
const Booking = require('./models/Booking');
require('dotenv').config();
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fasadddf32hjldad33adja';

app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
  })
);

Mongoose.connect(process.env.Mongo_URL);

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

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

// PROFILE
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

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
});

// UPLOAD-BY-LINK
app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName,
  });
  res.json(newName);
});

// UPLOAD PHOTO
const photosMiddleware = multer({ dest: 'uploads' });
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split('.');
    const ext = parts.slice(-1);
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace('uploads\\', ''));
  }
  res.json(uploadedFiles);
});

// New-PLACES
app.post('/places', (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  });
});

// User-Places
app.get('/user-places', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    res.json(await Place.find({ owner: userData.id }));
  });
});

app.get('/places:id', async (req, res) => {
  const { id } = req.params;

  res.json(await Place.findById(id));
});

app.put('/places', async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
    }
    res.json('ok');
  });
});

app.get('/places', async (req, res) => {
  res.json(await Place.find());
});

// Place
app.get('/places/:id', async (req, res) => {
  const { id } = req.params;

  res.json(await Place.findById(id));
});

// Booking
app.post('/bookings', async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { place, checkIn, checkOut, numberOfGuest, name, phone, price } =
    req.body;
  Booking.create({
    user: userData.id,
    place,
    checkIn,
    checkOut,
    numberOfGuest,
    name,
    phone,
    price,
  })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      throw err;
    });
});

app.get('/bookings', async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate('place'));
});

app.listen(3000);
