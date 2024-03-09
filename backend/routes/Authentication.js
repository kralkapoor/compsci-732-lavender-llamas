const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/Authentication');


router.post('/login', authenticationController.login);
router.post('/logout', authenticationController.logout);
router.post('/checkSession', authenticationController.checkAuthenticated);
router.post('/getUserEmail', authenticationController.getEmail);

module.exports = router;