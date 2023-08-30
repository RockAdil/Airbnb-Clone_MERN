const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlaceSchema = new Schema({
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
});
