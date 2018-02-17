const Customer = require('../models/customer.js');
module.exports = function (app) {

    app.post('/customer', (req, res) => {
        if (typeof req.body.name == "undefined" || typeof req.body.longitude == "undefined" || typeof req.body.latitude == "undefined")
            res.status(400).json({ "error": { "message": "Bad Request" } });
        else {
            let customer = new Customer({
                'name': req.body.name,
                'loc': [req.body.longitude, req.body.latitude]
            });
            customer.saveCustomer().
                then((data) => res.status(200).json({ "data": data })).
                catch((err) => res.status(500).json({ "error": err }));
        }

    });

    app.get('/customer', (req, res) => {
        Customer.getCustomers().
            then((data) => res.status(200).json({ "data": data })).
            catch((err) => res.status(500).json({ "error": err }));
    });

    app.get('/customer/:_id', (req, res) => {
        Customer.getCustomer(req.params._id).
            then((data) => res.status(200).json({ "data": data })).
            catch((err) => res.status(500).json({ "error": err }));
    });

}