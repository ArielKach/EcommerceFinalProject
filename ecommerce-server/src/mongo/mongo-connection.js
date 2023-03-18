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

module.exports = {
    mongoConnection
};