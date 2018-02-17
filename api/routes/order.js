const Order = require('../models/order.js');
module.exports = function (app) {

    app.get('/order', (req, res) => {
        Order.getOrders().
            then((data) => res.status(200).json({ "data": data })).
            catch((err) => res.status(400).json({ "error": err }));
    });

    app.get('/order/:_id', (req, res) => {
        Order.getOrder(req.params._id).
            then((data) => res.status(200).json({ "data": data })).
            catch((err) => res.status(400).json({ "error": err }));
    });

    app.post('/order', (req, res) => {
        let order = new Order({
            'shop': req.body.shop,
            'customer': req.body.customer,
            'products': req.body.products,
            'status': req.body.status
        });
        order.saveOrder().
            then((data) => res.status(200).json({ "data": data })).
            catch((err) => res.status(400).json({ "error": err }));
    });
}