const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, updatePassword } = require('../controllers/SettingsProfilePage');
const bcrypt = require('bcryptjs');

router.get('/getProfile/:userEmail', async (req, res) => {
    try {
        const { userEmail } = req.params;
        const userData = await getProfile(userEmail);
        res.status(201).json({ userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/updateProfile/:userEmail', async (req, res) => {
    const { userEmail } = req.params;
    const userInput = req.body;
    const newPassword = userInput.password;
    const salt = bcrypt.genSaltSync(10);

    try {

        const userData = await getProfile(userEmail);

        console.log(userEmail);
        console.log(userEmail.email);
        const validPassword = await bcrypt.compare(userInput.inputPassword, userData.password);

        if (validPassword) {

            // If there is new password -> update password
            if (newPassword) {
                const hashedPassword = await bcrypt.hash(newPassword, salt);
                updatePassword(userInput, hashedPassword);
            }

            // Update other information in profile except email
            await updateProfile(req.body);
            res.status(201).json({ validPass: true });

        } else {
            res.status(201).json({ validPass: false });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
