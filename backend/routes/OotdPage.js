const express = require('express');
const router = express.Router();
const { fetchUserFirstName } = require('../controllers/OotdPage');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// We want the user's first name to greet them on the OOTD page
// Currently deprecated
router.post('/getName', async (req, res) => {
  try {
    const name = await fetchUserFirstName(req.body.email);
    res.status(201).json({ name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving user's name"});
  }
});

// Called on selecting an outfit from the modal selection in OOTD
// We want to save the DALL-E generated outfit to the public folder to display in favourites later
router.post('/saveFavourite', async (req, res) => {
  const imgUrl = req.body.imgUrl;
  const email = req.body.email;
    try {
      // Make a get request to the url provided by DALL-E to save a chosen outfit
      const imgRes = await axios.get(imgUrl, {responseType: 'stream'});
      // We will name the file as a uuid to avoid any potential name conflicts
      const id = uuidv4()
      // Check if the user's public folder is created for saving imgs, otherwise create it
      const saveLocation = `public/${email}`
      const folderExists = fs.existsSync(saveLocation);
      if (!folderExists) {
        fs.mkdirSync(saveLocation);
      }
      // Create write stream @ the save location
      const file = fs.createWriteStream(`public/${email}/${id}.png`);
      // pipe the data stream to the file
      imgRes.data.pipe(file);
      res.status(201).json({message : "Success! Image saved to server"});
    } catch (error) {
      console.log(error);
      res.status(500).json({message: "Catastrophic failure"});
    }
  })

module.exports = router;