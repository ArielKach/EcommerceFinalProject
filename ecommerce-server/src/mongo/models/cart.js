const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                ref: 'products',
                required: true,
            },
            name: String,
            price: Number,
            category: String,
            description: String,
            image: String,
            size: String,
            quantity: Number,
        },
    ],
    active: {
        type: Boolean,
        required: true,
    },
});

const Cart = mongoose.model('carts', cartSchema);
module.exports = Cart;
