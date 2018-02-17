const Order = require('../models/order.js');
module.exports = function (app) {

    app.get('/order', (req, res) => {
        Order.getOrders().
            then((data) => res.status(200).json({ "data": data })).
            catch((err) => res.status(500).json({ "error": err }));
    });

    app.get('/order/customer/:_id', (req, res) => {
        Order.getOrderByCustomerId(req.params._id).
            then((data) => res.status(200).json({ "data": data })).
            catch((err) => res.status(500).json({ "error": err }));
    });
     app.get('/order/:_id', (req, res) => {
        Order.getOrder(req.params._id).
            then((data) => res.status(200).json({ "data": data })).
            catch((err) => res.status(500).json({ "error": err }));
    });

    app.get('/order/complete/:_id', (req, res) => {
        Order.completeOrder(req.params._id).
            then((data) => res.status(200).json({ "data": data })).
            catch((err) => res.status(500).json({ "error": err }));
    });

    app.post('/order', (req, res) => {
        let params = req.body;
        if (typeof params.customer == "undefined" || typeof params.products == "undefined")
            res.status(400).json({ "error": { "message": "Bad Request" } });
        else {
            let order = new Order({
                'customer': params.customer,
                'products': params.products
            });
            order.saveOrder().
                then((data) => res.status(200).json({ "data": data })).
                catch((err) => res.status(500).json({ "error": err }));
        }
    });
}