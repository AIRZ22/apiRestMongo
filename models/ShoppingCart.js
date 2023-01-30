const mongoose = require('mongoose');

const shoppingCartSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: false,
    },
    user: {
        type: String,
        required: true 
    },
    products: [
        {
            productId: {
                type: String,
                required: false
            },
            quantity: {
                type: Number,
                required: false
            },
            price: {
                type: Number,
                required: false
            }
        }
    ]

});

const shoppingCartModel = mongoose.model('shoppingCart', shoppingCartSchema);

module.exports = shoppingCartModel;
