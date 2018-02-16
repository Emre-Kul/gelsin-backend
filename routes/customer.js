const customer = require('../models/customer.js');
module.exports = function (app) {
    app.get('/customer', (req, res) => {
        customer.getCustomers().
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
    app.get('/customer/:_id', (req, res) => {
        customer.getCustomer(req.params._id).
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