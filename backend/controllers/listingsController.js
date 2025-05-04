const mongoose = require('mongoose');
const Listing = require('../models/Listing');

const createListing = async (req, res) => {
  try {
    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

    const {
      userId,
      name,
      shortDescription,
      longDescription,
      price,
      address,
      city,
      state,
      country,
      zip,
      checkin,
      checkout,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const newListing = new Listing({
      userId,
      name,
      shortDescription,
      longDescription,
      price,
      address,
      city,
      state,
      country,
      zip,
      checkin,
      checkout,
      imageUrls,
    });

    await newListing.save();
    res.status(201).json(newListing);
  } catch (error) {
    console.error('Listing creation error:', error);
    res.status(500).json({ message: 'Error creating listing', error: error.message });
  }
};

const getListingsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const listings = await Listing.find({ userId: userId  });
    res.json(listings);
  } catch (err) {
    console.error('Error fetching user listings:', err);
    res.status(500).json({ message: 'Error fetching user listings', error: err });
  }
};

const getAllListings = async (req, res) => {
  try {
    const { sort_by_price, destination } = req.query;
    const sortOrder = sort_by_price === 'desc' ? -1 : 1;

    const filter = {};

    if (destination) {
      filter.name = { $regex: destination, $options: 'i' };
    }

    const listings = await Listing.find(filter).sort({ price: sortOrder });

    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching listings', error });
  }
};

const getListingById = async (req, res) => {
  try {
    const listingId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(listingId)) {
      return res.status(400).json({ message: "Invalid listing ID" });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const baseUrl = 'http://localhost:5000';
    const fullImageUrls = listing.imageUrls.map(url => `${baseUrl}${url}`);

    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


const deleteListing = async (req, res) => {
  try {
    const deleted = await Listing.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send('Listing not found');
    res.send('Listing deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateListing = async (req, res) => {
  const { id } = req.params;
  const { name, address, price } = req.body;

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      { name, address, price },
      { new: true }
    );

    if (!updatedListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.json(updatedListing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createListing,
  getAllListings,
  deleteListing,
  updateListing,
  getListingById,
  getListingsByUserId
};
