const Booking = require('../models/Bookings');
const Listing = require('../models/Listing');

exports.createBooking = async (req, res) => {
    const { userId, listingId, checkinDate, checkoutDate, guests } = req.body;
  
    try {
      if (!userId || !listingId || !checkinDate || !checkoutDate || !guests) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const newBooking = new Booking({
        userId,
        listingId,
        checkinDate: new Date(checkinDate),
        checkoutDate: new Date(checkoutDate),
        guests,
      });
  
      await newBooking.save();
      res.status(201).json({ message: 'Booking successful' });
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ message: 'Server error' });
    }
};

exports.cancelBooking = async (req, res) => {
    const { id } = req.params;
  
    try {
      const booking = await Booking.findById(id);
  
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      await Booking.findByIdAndDelete(id);
  
      res.status(200).json({ message: 'Booking cancelled successfully' });
    } catch (error) {
      console.error('Error cancelling booking:', error);
      res.status(500).json({ message: 'Error cancelling booking', error: error.message });
    }
  };

exports.getBookingsByUser = async (req, res) => {
    try {
      const bookings = await Booking.find({ userId: req.params.userId });
  
      const enrichedBookings = await Promise.all(
        bookings.map(async booking => {
          const listing = await Listing.findById(booking.listingId);
          return {
            ...booking.toObject(),
            listingName: listing ? listing.name : 'Unknown Listing'
          };
        })
      );
  
      res.json(enrichedBookings);
    } catch (err) {
      console.error('Error fetching user bookings:', err);
      res.status(500).json({ message: 'Error fetching bookings' });
    }
};