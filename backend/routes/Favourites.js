const express = require('express');
const router = express.Router();
const fs = require('fs');

/*
This route will find all saved outfits in the static files directory
public/{userEmail} and display them on the favourites page.
*/
router.post('/all', async (req, res) => {
    // if the user has no public folder, then they have no favourites.
    const exists = fs.existsSync(`public/${req.body.email}`);
    if (!exists) {
        res.status(202).send({message : "User has no favourites yet"})
        return;
    }
    // return all favourite images
    fs.readdir(`public/${req.body.email}`, (err, files) => {
        if (err) {
            console.log("error", err);
            res.status(500).send("Unable to find public user folder")
            return;
        }
    res.status(200).json(files);
    });
});

module.exports = router;