const express = require("express");
const router = express.Router();
const { addWardrobeItem } = require("../controllers/WardrobePage");

// Define a route handler for the "/addWardrobeItem" endpoint that handles POST requests
router.post("/addWardrobeItem", async (req, res) => {
  try {
     // Call the wardrobePage function with the request body and wait for it to complete
    const item = await addWardrobeItem(req.body);
    // If the function executes successfully, set the response status code to 201 and return the itemId in JSON format
    res.status(201).json({ item });
  } catch (error) {
    console.error(error);
    // If an error occurs during the execution of the function, log the error to the console and return a 500 status code with an error message in JSON format
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
