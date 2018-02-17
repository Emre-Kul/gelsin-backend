const Shop = require('../models/shop.js');
module.exports = function (app) {

    app.get('/shop', (req, res) => {
        Shop.getShops().
            then((data) => {
                let newData = [];
                data.forEach(function (obj) {
                    obj = obj.toObject();
                    obj.category_name = obj.category.name;
                    obj.category_id = obj.category._id;
                    obj.latitude = obj.loc[0];
                    obj.longitude = obj.loc[1];
                    delete obj.loc;
                    delete obj.category;
                    newData.push(obj);
                });
                res.status(200).json({ "data": newData })
            }).
            catch((err) => res.status(500).json({ "error": err }));
    });

    app.post('/shop', (req, res) => {
        let shop = new Shop({
            'name': req.body.name,
            'category': req.body.category,
            'loc': [req.body.latitude, req.body.longitude]
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
                then((data) => {
                    let newData = [];
                    data.forEach(function (obj) {
                        obj = obj.toObject();
                        obj.category_name = obj.category.name;
                        obj.category_id = obj.category._id;
                        obj.latitude = obj.loc[0];
                        obj.longitude = obj.loc[1];
                        delete obj.loc;
                        delete obj.category;
                        newData.push(obj);
                    });
                    res.status(200).json({ "data": newData })
                }).
                catch((err) => res.status(500).json({ "error": err }));
        }
    });

    app.get('/shop/:_id', (req, res) => {
        Shop.getShop(req.params._id).
            then((data) => {

                data = data.toObject();
                data.category_name = data.category.name;
                data.category_id = data.category._id;
                data.latitude = data.loc[0];
                data.longitude = data.loc[1];
                delete data.loc;
                delete data.category;

                res.status(200).json({ "data": data })

            }).
            catch((err) => res.status(500).json({ "error": err }));
    });


}