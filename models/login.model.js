const mongoose = require('mongoose');

var loginSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: 'This field is required'
    },
    Password: {
        type: String
    },
    Time: {
        type: String
    }
})

mongoose.model('Login', loginSchema);