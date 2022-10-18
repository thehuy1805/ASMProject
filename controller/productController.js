const express = require('express');
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("product/addOrEditProduct", {
        viewTitle: "Insert Product"
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
    var product = new Product();
    product.ID = req.body.ID;
    product.NameProduct = req.body.NameProduct;
    product.Category = req.body.Category;
    product.Origin = req.body.Origin;
    product.Description = req.body.Description;

    product.save((err, doc) => {
        if (!err) {
            res.redirect('product/list');
        } else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("product/addOrEditProduct", {
                    viewTitle: "Insert Product",
                    product: req.body
                })
            }
            console.log("Error occured during record insertion" + err);
        }
    })
}

function updateRecord(req, res) {
    Product.findOneAndUpdate({ _id: req.body._id, }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('product/list');
        } else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("product/addOrEditProduct", {
                    viewTitle: 'Update Product',
                    product: req.body
                });
            } else {
                console.log("Error occured in Updating the records" + err);
            }
        }
    })
}

router.get('/list', (req, res) => {
    Product.find((err, docs) => {
        if (!err) {
            res.render("product/list", {
                list: docs
            })
        }
    })
})

router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("product/addOrEditProduct", {
                viewTitle: "Update Product",
                product: doc
            })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/product/list');
        } else {
            console.log("An error occured during the Delete Process" + err);
        }
    })
})

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'ID':
                body['IDError'] = err.errors[field].message;
                break;

            case 'NameProduct':
                body['NameProductError'] = err.errors[field].message;
                break;

            case 'Origin':
                body['OriginError'] = err.errors[field].message;
                break;

            default:
                break;
        }
    }
}

module.exports = router;