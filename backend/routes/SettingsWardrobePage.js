const express = require('express');
const router = express.Router();
const { getWardrobeItems, deleteWardrobeItem } = require('../controllers/SettingsWardrobePage');

router.get('/getWardrobeItems/:userEmail', async (req, res) => {
    try {
        const { userEmail } = req.params;
        const wardrobeItems = await getWardrobeItems(userEmail);
        console.log("get wardrobe ok")
        // console.log(wardrobeItems);
        res.status(201).json({ wardrobeItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/deleteWardrobeItem', async (req, res) => {
    try {
        const itemId = req.body.itemId;
        await deleteWardrobeItem(itemId);
        res.status(201).json({ isItemDeleted: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;