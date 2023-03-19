const express = require('express');
const router = express.Router();
const auth = require('../general/auth');
const joi = require('joi');
const Cart = require('../mongo/models/cart');
const { update } = require('../mongo/models/cart');

const productSchema = joi.object({
	productId: joi.string(),
	name: joi.string().required().min(2),
	price: joi.number().required().min(2),
	categoryName: joi.string().required().min(2),
	description: joi.string().required().min(6),
	image: joi.string().required(),
	brand: joi.string().required(),
});

router.post('/updateProductQuantity', auth, async (req, res) => {
	try {
		const userId = req.payload.userId;
		const updatedCart = await Cart.updateOne(
			{
				userId,
				'products.productId': req.body.productId,
			},
			{ $set: { 'products.$.quantity': req.body.quantity } }
		);
		if (updatedCart.matchedCount == 0 || updatedCart.modifiedCount == 0) {
			throw new Error("Cart or product doesn't exists");
		}

		res.send({ quantity: req.body.quantity });
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.post('/addProduct', auth, async (req, res) => {
	try {
		const { error } = productSchema.validate(req.body.product);
		if (error) return res.status(400).send(error.message);

		const userId = req.payload.userId;

		let cart = await Cart.findOne({ userId });
		if (!cart) {
			await Cart.insertMany([{ userId, active: true }]);
			cart = await Cart.findOne({ userId });
		}

		const updatedCart = await Cart.findOneAndUpdate(
			{
				userId,
				'products.productId': req.body.product.productId,
			},
			{ $inc: { 'products.$.quantity': 1 } }
		);
		if (updatedCart) {
			res.send(updatedCart.products);
		} else {
			const updateResult = await Cart.findOneAndUpdate(
				{ userId },
				{ $addToSet: { products: { ...req.body.product, quantity: 1 } } },
				{ new: true }
			);
			res.send(updateResult);
		}
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/', auth, async (req, res) => {
	try {
		const userId = req.payload.userId;
		let cart = await Cart.findOne({ userId });
		if (!cart) return res.status(200).send([]);

		res.status(200).send(cart.products);
	} catch (error) {
		res.status(400).send('Error in Get Products');
	}
});

router.put('/', auth, async (req, res) => {
	try {
		const userId = req.payload.userId;

		let cart = await Cart.findOne({ userId });
		if (!cart) return res.status(404).send('Theres no such Cart');

		await cart.updateOne({ products: [] });
		res.status(200).send('Cart Deleted Successfully!');
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete('/delete-product/:id', auth, async (req, res) => {
	const productId = req.params.id;

	try {
		const userId = req.payload.userId;

		const data = await Cart.updateOne(
			{
				userId,
			},
			{ $pull: { products: { productId } } }
		);

		if (data.matchedCount == 0) {
			throw new Error("Cart doesn't exists");
		} else if (data.modifiedCount == 0) {
			throw new Error("Product doesn't exists");
		}

		res.send({ matchedCount: data.modifiedCount });
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
