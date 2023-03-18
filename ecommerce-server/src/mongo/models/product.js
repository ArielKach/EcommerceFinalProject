const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    price: {
        type: Number,
        required: true,
        minlength: 2,
    },
    categoryName: {
        type: String,
        ref: 'categories',
        required: true,
        minlength: 2,
    },
    description: {
        type: String,
        required: true,
        minlength: 6,
    },
    image: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    }
});

const Product = mongoose.model('products', productSchema);
module.exports = Product;
