const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

const { createListing, getAllListings, deleteListing, updateListing, getListingById, getListingsByUserId } = require('../controllers/listingsController');

router.post('/', upload.array('images', 5), createListing);
router.get('/', getAllListings);
router.get('/:id', getListingById);
router.delete('/:id', deleteListing);
router.put('/:id', updateListing);
router.get('/user/:userId', getListingsByUserId);

module.exports = router;
