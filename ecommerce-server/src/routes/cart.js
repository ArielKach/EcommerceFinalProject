const express = require("express");
const router = express.Router();
const auth = require("../general/auth");
const joi = require("joi");
const Cart = require("../mongo/models/cart");

const productSchema = joi.object({
  productId: joi.string(),
  name: joi.string().required().min(2),
  price: joi.number().required().min(2),
  categoryName: joi.string().required().min(2),
  description: joi.string().required().min(6),
  image: joi.string().required(),
  brand: joi.string().required(),
});

router.post("/updateProductQuantity", auth, async (req, res) => {
  try {
    const userId = req.payload.userId;
    const updatedCart = await Cart.updateOne(
      {
        userId,
        "products.productId": req.body.productId,
      },
      { $set: { "products.$.quantity": req.body.quantity } }
    );
    if (updatedCart.matchedCount == 0 || updatedCart.modifiedCount == 0) {
      throw new Error("Cart or product doesn't exists");
    }

    res.send({ quantity: req.body.quantity });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/addProduct", auth, async (req, res) => {
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
        "products.productId": req.body.product.productId,
      },
      { $inc: { "products.$.quantity": 1 } }
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

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.payload.userId;
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(200).send([]);

    res.status(200).send(cart.products);
  } catch (error) {
    res.status(400).send("Error in Get Products");
  }
});

router.put("/", auth, async (req, res) => {
  try {
    const userId = req.payload.userId;

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).send("Theres no such Cart");

    await cart.updateOne({ products: [] });
    res.status(200).send("Cart Deleted Successfully!");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/delete-product/:id", auth, async (req, res) => {
  const prodId = req.params.id;

  try {
    const userId = req.payload.userId;

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).send("Theres no such Cart");

    const productFilter = cart.products.filter(
      (item) => item.productId == prodId
    );
    let itemIndex = cart.products.indexOf(productFilter[0]);

    if (itemIndex == -1)
      return res.status(404).send("No Such product in the cart");
    else {
      cart.products.splice(itemIndex, 1);
    }

    await cart.save();

    res.status(201).send(cart);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/sum", auth, async (req, res) => {
  try {
    const userId = req.payload.userId;
    const pipeline = [
      { $match: { userId: userId } },
      { $unwind: "$products" },
      {
        $group: {
          _id: "$userId",
          total_price: {
            $sum: { $multiply: ["$products.price", "$products.quantity"] },
          },
        },
      },
    ];

    Cart.aggregate(pipeline, function (err, results) {
      if (err) {
        throw err;
      } else {
        res.status(200).send(JSON.stringify(results[0].total_price));
      }
    });
  } catch (error) {
    res.status(400).send("Error in get Product");
  }
});

module.exports = router;
