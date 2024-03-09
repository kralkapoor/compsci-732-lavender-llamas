// Import the express library and create a router
const express = require('express');
const router = express.Router();

// Import the generateOutfits and changeClotheWornDate functions from their respective controllers
const { generateOutfits, changeClotheWornDate } = require('../controllers/Generator')

// Handle POST requests to the '/generateOutfits' endpoint
router.post('/generateOutfits', async (req, res) => {
  try {
    // Log a message indicating the email and color scheme for which outfits are being generated
    console.log(req.body);
    console.log("Generating Outfits for " + req.body.email.email + ", with color scheme: " + req.body.colorScheme) //not implemented colour scheme. always undefined
    // Call the generateOutfits function with the provided email, weather values, and color scheme
    const response = await generateOutfits(req.body.email.email, req.body.weatherValues, req.body.colorScheme);
    // Respond with the generated outfits in JSON format
    res.status(201).json(response);
  } catch (error) {
    // If an error occurs, log it and respond with a 500 error
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Handle POST requests to the '/changeClotheWornDate' endpoint
router.post('/changeClotheWornDate', async (req, res) => {
  try {
    // Log a message indicating the IDs of the clothes whose last worn dates are being changed
    console.log("Changing lastword for id's " + req.body.listOfIds);
    // Call the changeClotheWornDate function with the provided list of IDs
    const response = await changeClotheWornDate(req.body.listOfIds);
    // Respond with a success message in JSON format
    res.status(201).json(response);
  } catch (error){
    // If an error occurs, log it and respond with a 500 error
    console.error(error);
    res.status(500).json({error: 'Internal server error'});
  }
})

// Export the router so that it can be used by the express app
module.exports = router;
