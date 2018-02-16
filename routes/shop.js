const shop = require('../models/shop.js');
module.exports = function (app) {
    app.get('/shop', (req, res) => {
        shop.getShops().
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
    app.get('/shop/:_id', (req, res) => {
        shop.getShop(req.params._id).
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