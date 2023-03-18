const express = require('express');
const router = express.Router();
const auth = require('../general/auth');
const User = require('../mongo/models/user');

router.get('/', auth, async (req, res) => {
    try {
        let user = await User.findOne({ userId: req.headers.userid });
        if (!user) return res.status(400).send('Wrong user');
        const {_id: _, ...newUser} = user._doc;
        res.status(200).send(newUser);
    } catch (error) {
        res.status(400).send('Error in Get user');
    }
});


module.exports = router;
