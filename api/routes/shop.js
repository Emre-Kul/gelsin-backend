const Shop = require('../models/shop.js');
module.exports = function (app) {
    
    app.get('/shop', (req, res) => {
        Shop.getShops().
            then((data) => res.status(200).json({ "data": data })).
            catch((err) => res.status(400).json({ "error": err }));

    });

    app.post('/shop', (req, res) => {
        let shop = new Shop({
            'name': req.body.name,
            'category': req.body.category,
            'longitude': req.body.longitude,
            'latitude': req.body.latitude
        });
        shop.saveShop()
        then((data) => res.status(200).json({ "data": data })).
            catch((err) => res.status(400).json({ "error": err }));
    });

    app.get('/shop/:_id', (req, res) => {
        Shop.getShop(req.params._id).
            then((data) => res.status(200).json({ "data": data })).
            catch((err) => res.status(400).json({ "error": err }));
    });

}