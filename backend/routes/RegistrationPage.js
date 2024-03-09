const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/RegistrationPage');

router.post('/registerNewUser', async (req, res) => {
  try {
    const userId = await registerUser(req.body);
    res.status(201).json({ userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
