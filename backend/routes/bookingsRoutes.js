const express = require('express');
const router = express.Router();
const { createBooking, cancelBooking, getBookingsByUser } = require('../controllers/bookingsController');
const Booking = require('../models/Bookings');
const Listing = require('../models/Listing');

router.post('/', createBooking);
router.delete('/:id', cancelBooking);
router.get('/user/:userId', getBookingsByUser);

module.exports = router;