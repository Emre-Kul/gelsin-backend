const Product = require('../models/product.js');
module.exports = function (app) {

    app.get('/product', (req, res) => {
        Product.getProducts().
            then((data) => res.status(200).json({ "data": data })).
            catch((err) => res.status(500).json({ "error": err }));
    });

    app.post('/product', (req, res) => {
        let params = req.body;
        if (typeof params.name == "undefined" || typeof params.price == "undefined" || typeof params.shop == "undefined")
            res.status(400).json({ "error": { "message": "Bad Request" } });
        else {
            let product = new Product({
                'name': req.body.name,
                'price': req.body.price,
                'shop': req.body.shop
            });
            product.saveProduct().
                then((data) => res.status(200).json({ "data": data })).
                catch((err) => res.status(500).json({ "error": err }));
        }
    });

    app.get('/product/shop/:_id', (req, res) => {
        Product.getProductsOfShop(req.params._id).
            then((data) => res.status(200).json({ "data": data })).
            catch((err) => res.status(500).json({ "error": err }));
    });

    app.get('/product/remove/:_id', (req, res) => {
        Product.removeProduct(req.params._id).
            then((data) => res.status(200).json({ "data": data })).
            catch((err) => res.status(500).json({ "error": err }));
    });

    app.post('/product/edit/:_id', (req, res) => {
        Product.editProduct(req.params._id, req.body).
            then((data) => res.status(200).json({ "data": data })).
            catch((err) => res.status(500).json({ "error": err }));
    });

    app.get('/product/search/:search_val', (req, res) => {
        Product.searchProductByName(req.params.search_val).
            then((data) => res.status(200).json({ "data": data })).
            catch((err) => res.status(500).json({ "error": err }));

    });
    app.get('/product/:_id', (req, res) => {
        Product.getProduct(req.params._id).
            then((data) => res.status(200).json({ "data": data })).
            catch((err) => res.status(500).json({ "error": err }));
    });

}