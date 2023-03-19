const express = require('express');
const router = express.Router();
const auth = require('../general/auth');
const joi = require('joi');
const Order = require('../mongo/models/order');
const Cart = require('../mongo/models/cart');
const Product = require('../mongo/models/product');

const productSchema = joi.object({
    productIds: joi.array().required(),
    totalPrice: joi.number().required(),
});

router.post('/', auth, async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body);
        if (error) return res.status(400).send('details are not as expected');

        const userId = req.payload.userId;

        let cart = await Cart.findOne({ userId });

        if (!cart) return res.status(400).send('cart not found');

        let order = await Order.insertMany([
            {
                userId,
                productIds: req.body.productIds,
                totalPrice: req.body.totalPrice,
                orderDate: new Date().getTime().toString(),
            },
        ]);

        await cart.updateOne({ products: [] });
        await cart.updateOne({ active: false });
        await cart.save();

        res.status(200).send(order[0]._doc._id);
    } catch (error) {
        res.status(400).send('Error in Get Products');
    }
});

router.get('/:id', async (req, res) => {
    try {
        let order = await Order.findOne({ _id: req.params.id });
        if (!order) return res.status(404).send('Theres no such order');

        let products = await Product.find({ _id: { $in: order.productIds } });
        products = products.map(product => product._doc);

        res.status(200).send({ ...order._doc, products });
    } catch (error) {
        console.log(error);

        res.status(400).send('Error in get Product');
    }
});

router.post('/delete/:id', async (req, res) => {
    try {
        let data = await Order.deleteOne({ _id: req.params.id });

        console.log(data);
        res.status(200).send({ data });
    } catch (error) {
        console.log(error);
        res.status(400).send('Error in delete order');
    }
});

router.get('/', auth, async (req, res) => {
    try {
        if (!req.payload.email)
            return res.status(400).send('details are not as expected');

        const userId = req.payload.userId;

        let orders = await Order.find({ userId });
        let products;
        let returnOrders = [];
        for (let order of orders) {
            products = await Product.find({ _id: { $in: order.productIds } });
            returnOrders.push({
                ...order._doc,
                products: products.map(product => product._doc),
            });
        }
        res.status(200).send([...returnOrders]);
    } catch (error) {
        console.log(error);
        res.status(400).send('Error in get Product');
    }
});

router.get('/getInfo/historyCategories', auth, async (req, res) => {
    try {
        const userId = req.payload.userId;

        let orders = await Order.aggregate([
            {
                $match: { userId },
            },
            {
                $unwind: { path: '$productIds' },
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productIds',
                    foreignField: '_id',
                    as: 'product',
                },
            },
            {
                $project: {
                    category: { $first: '$product.category' },
                },
            },
            {
                $group: {
                    _id: '$category',
                    count: { $count: {} },
                },
            },
        ]);

        res.status(200).send([...orders]);
    } catch (error) {
        console.log(error);

        res.status(400).send('Error in get Product');
    }
});

module.exports = router;
