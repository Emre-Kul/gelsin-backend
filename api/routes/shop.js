const Shop = require('../models/shop.js');
module.exports = function (app) {

    app.get('/shop', (req, res) => {
        Shop.getShops().
            then((data) => res.status(200).json({ "data": data })).
            catch((err) => res.status(500).json({ "error": err }));

    });

    app.post('/shop', (req, res) => {
        let shop = new Shop({
            'name': req.body.name,
            'category': req.body.category,
            'loc': [req.body.longitude, req.body.latitude]
        });
        shop.saveShop().
            then((data) => res.status(200).json({ "data": data })).
            catch((err) => res.status(500).json({ "error": err }));
    });

    app.get('/shop/near', (req, res) => {
        if (typeof req.query.longitude == 'undefined' || typeof req.query.latitude == 'undefined' || typeof req.query.distance == "undefined")
            res.status(400).json({ "error": { "message": "Bad Request" } });
        else {
            Shop.findNearShops(
                {
                    'longitude': req.query.longitude,
                    'latitude': req.query.latitude
                }
                , req.query.distance).
                then((data) => res.status(200).json({ "data": data })).
                catch((err) => res.status(500).json({ "error": err }));
        }
    });
    
    app.get('/shop/:_id', (req, res) => {
        Shop.getShop(req.params._id).
            then((data) => res.status(200).json({ "data": data })).
            catch((err) => res.status(500).json({ "error": err }));
    });


}