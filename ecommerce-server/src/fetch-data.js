const axios = require('axios');

const productDB = require('./mongo/models/product');
const CategoriesDB = require('./mongo/models/category');
const mongoose = require('mongoose');

const DB_URL = process.env.db || 'mongodb://127.0.0.1:27017/ecommerce';

const mongoConnection = async () => {
    await mongoose.connect(DB_URL)
    .then(() => {
        console.log('Connected to database');
    })
    .catch(err => {
        console.log('Could not connect to database', err);
        process.exit();
    });
};

function convertProduct(product) {
    const newProduct = {
        name: product?.title,
        price: product?.price,
        categoryName: product?.category,
        description: product?.description,
        image: product?.images[0],
        brand: product?.brand,
    };

    return newProduct;
}

async function fetchCategoriesAndProducts() {
    await mongoConnection();
    try {
        const categoriesResponse = await axios.get(
            'https://dummyjson.com/products/categories',
        );
        console.log('fetched categories from api');

        const categories = [];
        categoriesResponse.data.forEach(fetchedCategory => {
            const newCategory = {
                categoryName: fetchedCategory
            }
            categories.push(newCategory);
        })

        await CategoriesDB.insertMany(categories)
            .catch(error => {
                console.log(error);
            });
        console.log('Inserted categories to DB');

        const productsResponse = await axios.get(
            'https://dummyjson.com/products?limit=100&select=title,price,category,description,images,brand',
        );
        console.log('fetched products from api');

        const products = [];
        productsResponse.data.products?.forEach(fetchedProduct => {
            products.push(convertProduct(fetchedProduct));
        });
        
        await productDB.insertMany(products)
            .catch(error => {
                console.log(error);
            });
        console.log('Inserted products to DB');

        return products;
    } catch (error) {
        console.error(error);
        return null;
    }
}

fetchCategoriesAndProducts();
