const express = require('express');
const router = express.Router();
const auth = require('../general/auth');
const joi = require('joi');
const Product = require('../mongo/models/product');

const productSchema = joi.object({
    name: joi.string().required().min(2),
    price: joi.number().required().min(2),
    categoryName: joi.string().required().min(2),
    description: joi.string().required().min(6),
    image: joi.string().required(),
    brand: joi.string().required(),
});

router.post('/', auth, async (req, res) => {
    try {
        // Check if the the user is Admin
        if (!req.payload.isAdmin)
            return res.status(400).send('Only Admin can add Products');

        const { error } = productSchema.validate(req.body);
        if (error) return res.status(400).send(error.message);

        let product = new Product(req.body);
        await product.save();

        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        let products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send('Error in get Products');
    }
});

router.get('/', async (req, res) => {
    try {
        let products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send('Error in get Products');
    }
});

router.get('/:category', async (req, res) => {
    // destructure page and limit and set default values
    const { query, inStock, page = 1, limit = 10 } = req.query;
    const category = req.params.category !== "all" ? req.params.category : "";

    try {
        let allProducts;
        if (query) {
            allProducts = await Product.find({
                $and: [
                    {
                        ...(inStock && { inStock: inStock }),
                        ...(category && { category: category }),
                    },
                    { name: { $regex: new RegExp(query, 'i') } },
                ],
            })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
        } else {
            allProducts = await Product.find({
                ...(category && { category: category }),
                ...(inStock && { inStock: inStock }),
            })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
        }

        const count = allProducts.length;

        res.json({
            allProducts,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (err) {
        console.error(err.message);
    }
});

router.get('/id/:id', async (req, res) => {
    try {
        let product = await Product.findOne({ _id: req.params.id });
        if (!product) return res.status(404).send('Theres no such product');
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send('Error in get Product...');
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        // Check if the the user is Admin
        if (!req.payload.isAdmin)
            return res.status(400).send('Only Admin can update Products');

        const { error } = productSchema.validate(req.body);
        if (error) return res.status(400).send(error.message);

        let product = await Product.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true },
        );
        if (!product) return res.status(404).send('No Such Product');

        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        // Check if the the user is Admin
        if (!req.payload.isAdmin)
            return res.status(400).send('Only Admin can delete Products');

        let product = await Product.findOneAndRemove({ _id: req.params.id });
        if (!product) return res.status(400).send('Product was not found!');
        res.status(200).send('Product Removed Successfully!');
    } catch (error) {
        res.status(400).send('Error in delete Product');
    }
});

module.exports = router;
