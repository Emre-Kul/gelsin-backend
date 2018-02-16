const product = require('../models/product.js');
module.exports = function (app) {
    app.get('/product', (req, res) => {
        product.getProducts().
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
    app.get('/product/:_id', (req, res) => {
        product.getProduct(req.params._id).
            then((cityData) => {
                res.status(200).json({
                    "status": "success",
                    "data": cityData
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