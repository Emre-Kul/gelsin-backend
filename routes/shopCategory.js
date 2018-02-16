const shopCategory = require('../models/shopCategory.js');
module.exports = function (app) {
    app.get('/shopCategory', (req, res) => {
        shopCategory.getShopCategorys().
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
    app.get('/shopCategory/:_id', (req, res) => {
        shopCategory.getShopCategory(req.params._id).
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