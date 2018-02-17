const Product = require('../models/product.js');
module.exports = function (app) {
    app.get('/product', (req, res) => {
        Product.getProducts().
            then((data) => {
                res.status(200).json({
                    "status": "success",
                    "data": data
                });
            }).
            catch((err) => {
                res.status(400).json({
                    "status": "error",
                    "error": err
                });
            });

    });
    app.post('/product', (req, res) => {
        let product = new Product({
            'name': req.body.name,
            'price': req.body.name,
            'shop_id': req.body.shop_id
        });
        product.saveProduct().then((data) => {
            res.status(200).json({
                "status": "success",
                "data": data
            })
        }).catch((err) => {
            res.status(400).json({
                "status": "error",
                "error": err
            })
        });
    });
    app.get('/product/:_id', (req, res) => {
        Product.getProduct(req.params._id).
            then((data) => {
                res.status(200).json({
                    "status": "success",
                    "data": data
                })
            }).
            catch((err) => {
                res.status(400).json({
                    "status": "error",
                    "error": err
                });
            })
    });
}