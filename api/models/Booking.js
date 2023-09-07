const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
  place: { type: Schema.Types.ObjectId, require: true, ref: 'Place' },
  user: { type: Schema.Types.ObjectId, require: true },
  checkIn: { type: Date, require: true },
  checkOut: { type: Date, require: true },
  numberOfGuest: { type: Number, require: true },
  name: { type: String, require: true },
  phone: { type: String, require: true },
  price: Number,
});

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;
