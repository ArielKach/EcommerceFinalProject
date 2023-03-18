const express = require('express');
const router = express.Router();
const auth = require('../general/auth');
const joi = require('joi');
const Cart = require('../mongo/models/cart');

const productSchema = joi.object({
    productId: joi.string(),
    name: joi.string().required().min(2),
    price: joi.number().required().min(2),
    categoryName: joi.string().required().min(2),
    description: joi.string().required().min(6),
    image: joi.string().required(),
    brand: joi.string().required(),
    quantity: joi.number().required(),
});

router.post('/', auth, async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body);
        if (error) return res.status(400).send(error.message);

        const headerUserId = req.headers.userid;

        let cart = await Cart.findOne({ userId: headerUserId });

        if (!cart) {
            await Cart.insertMany([{ userId: headerUserId, active: true }]);
            cart = await Cart.findOne({ userId: headerUserId });
        }

        cart.products.push(req.body);
        await cart.save();
        res.status(200).send(cart.products);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const headerUserId = req.headers.userid;

        let cart = await Cart.findOne({ userId: headerUserId });
        if (!cart) return res.status(200).send([]);

        res.status(200).send(cart.products);
    } catch (error) {
        res.status(400).send('Error in Get Products');
    }
});

router.put('/', auth, async (req, res) => {
    try {
        const headerUserId = req.headers.userid;

        let cart = await Cart.findOne({ userId: headerUserId });
        if (!cart) return res.status(404).send('Theres no such Cart');

        await cart.updateOne({ products: [] });
        res.status(200).send('Cart Deleted Successfully!');
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/delete-product/:id', auth, async (req, res) => {
    const prodId = req.params.id;

    try {
        const headerUserId = req.headers.userid;

        let cart = await Cart.findOne({ userId: headerUserId });
        if (!cart) return res.status(404).send('Theres no such Cart');

        const productFilter = cart.products.filter(
            item => item.productId == prodId,
        );
        let itemIndex = cart.products.indexOf(productFilter[0]);

        if (itemIndex == -1)
            return res.status(404).send('No Such product in the cart');
        else {
            cart.products.splice(itemIndex, 1);
        }

        await cart.save();

        res.status(201).send(cart);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
