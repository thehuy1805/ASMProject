const mongoose = require('mongoose');

var ordersSchema = new mongoose.Schema({
    Quantity: {
        type: String,
        required: 'This field is required'
    },
    Amount: {
        type: String,
        required: 'This field is required'
    },
    OrderDate: {
        type: Date,
        default: Date.now()
    },
    Employee: {
        type: String,
        required: 'This field is required'
    },
    Brand: {
        type: String,
        required: 'This field is required'
    }


});

mongoose.model('Orders', ordersSchema);