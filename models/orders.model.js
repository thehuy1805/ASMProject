const mongoose = require('mongoose');

var ordersSchema = new mongoose.Schema({
    Quantity: {
        type: String,
        required: 'This field is required'
    },
    Total: {
        type: String,
        required: 'This field is required'
    },
    OrderDate: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('Orders', ordersSchema);