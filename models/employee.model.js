const mongoose = require('mongoose');
var validator = require("email-validator");

var employeeSchema = new mongoose.Schema({
    Name: {
        type: String
    },
    Birth: {
        type: String
    },
    Email: {
        type: String
    },
    NumberPhone: {
        type: String
    },
    Address: {
        type: String
    }
})

// custom validation for email

employeeSchema.path('Email').validate((val) => {
    return validator.validate(val);
}, 'Invalid Email');

mongoose.model('Employee', employeeSchema);