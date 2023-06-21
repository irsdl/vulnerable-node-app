const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Product = new Schema({
    name: {
        type: String
    },
    category: {
        type: String
    },
    released: {
        type: Boolean
    },
    quantity: {
        type: String
    }
}, {
    collection: 'products'
});

module.exports = mongoose.model('Product', Product);