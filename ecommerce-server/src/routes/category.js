const express = require('express');
const router = express.Router();
const Category = require('../mongo/models/category');

router.get('/', async (req, res) => {
    try {
        let category = await Category.find();
        res.status(200).send(category);
    } catch (error) {
        res.status(400).send('Error in get Category');
    }
});

module.exports = router;
