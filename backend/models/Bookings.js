const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
    checkinDate: Date,
    checkoutDate: Date,
    guests: Number
  });

module.exports = mongoose.model('Bookings', bookingSchema);