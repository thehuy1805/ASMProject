const express = require('express');
const mongoose = require('mongoose');
const Orders = mongoose.model('Orders');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("orders/addOrEditOrders", {
        viewTitle: "Order Insert"
    })
})


router.post("/", (req, res) => {
    if (req.body._id == "") {
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }
})

function insertRecord(req, res) {
    var orders = new Orders();
    orders.Quantity = req.body.Quantity;
    orders.Total = req.body.Total;

    orders.save((err, doc) => {
        if (!err) {
            res.redirect('orders/list');
        } else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("orders/addOrEditOrders", {
                    viewTitle: "Orders Insert",
                    orders: req.body
                })
            }
            console.log("Error occured during record insertion" + err);
        }
    })
}

router.get('/list', (req, res) => {
    Orders.find((err, docs) => {
        if (!err) {
            res.render("orders/list", {
                list: docs
            })
        }
    })
})


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'Quantity':
                body['QuantityError'] = err.errors[field].message;
                break;

            case 'Total':
                body['TotalError'] = err.errors[field].message;
                break;

            default:
                break;
        }
    }
}

module.exports = router;