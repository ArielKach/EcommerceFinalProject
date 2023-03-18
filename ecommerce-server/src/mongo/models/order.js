const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'users',
        required: true,
    },
    productIds: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'products',
            required: true,
        },
    ],
    totalPrice: {
        type: String,
        required: true,
    },
    orderDate: {
        type: String,
        required: true,
    },
});

const Order = mongoose.model('orders', orderSchema);
module.exports = Order;
