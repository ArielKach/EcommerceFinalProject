const express = require("express");
const router = express.Router();
const auth = require("../general/auth");
const joi = require("joi");
const Order = require("../mongo/models/order");
const Cart = require("../mongo/models/cart");
const Product = require("../mongo/models/product");

const productSchema = joi.object({
  productIds: joi.array().required(),
  totalPrice: joi.number().required(),
});

router.post("/", auth, async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).send("details are not as expected");

    const userId = req.payload.userId;

    let cart = await Cart.findOne({ userId });

    if (!cart) return res.status(400).send("cart not found");
    let order = await Order.insertMany([
      {
        userId,
        productIds: req.body.productIds,
        totalPrice: req.body.totalPrice,
        orderDate: new Date(Date.now()).toDateString(),
      },
    ]);

    await cart.updateOne({ products: [] });
    await cart.save();

    res.status(200).send(order[0]._doc._id);
  } catch (error) {
    res.status(400).send("Error in Get Products");
  }
});

router.get("/dates", async (req, res) => {
  try {
    const data = await Order.aggregate([
      {
        $addFields: {
          totalPriceNumber: {
            $convert: {
              input: "$totalPrice",
              to: "double",
              onError: 0,
              onNull: 0,
            },
          },
        },
      },
      {
        $group: {
          _id: "$orderDate",
          sum: { $sum: "$totalPriceNumber" },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          sum: 1,
        },
      },
    ]);
    res.send(data);
  } catch (error) {
    res.status(400).send("Error in order/dates");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    res.send(await Order.find({ userId: req.payload.userId }));
  } catch (error) {
    console.log(error);
    res.status(400).send("Error in get Product");
  }
});

module.exports = router;
