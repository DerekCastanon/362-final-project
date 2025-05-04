const axios = require('axios');

async function createListing() {
  try {
    const listing = {
      name: 'Skyline Loft',
      shortDescription: 'AAAAAAAAAAAAA',
      longDescription: 'A modern loft with stunning skyline views.A modern loft with stunning ng skyline views.A modern loft with stunning skyline views.',
      price: 450,
      location: 'New York City, New York',
      address: '456 Skyview Blvd',
      city: 'New York City',
      state: 'New York',
      country: 'USA',
      zip: '10001',
      imageUrls: ['images/dirtciv.png']
    };

    console.log('Sending request to create listing...');
    
    const response = await axios.post('http://localhost:5000/api/listings', listing);
    
    console.log('Listing created successfully:', response.data);
  } catch (error) {
    console.error('Error creating listing:', error.message);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
  }
}

createListing();