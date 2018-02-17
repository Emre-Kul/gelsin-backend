const shopCategory = require('../models/shopCategory.js');
module.exports = function (app) {
    
    app.get('/shopCategory', (req, res) => {
        shopCategory.getShopCategorys().
            then((data) => res.status(200).json({ "data": data })).
            catch((err) => res.status(500).json({ "error": err }));
    });

    app.get('/shopCategory/:_id', (req, res) => {
        shopCategory.getShopCategory(req.params._id).
            then((data) => res.status(200).json({ "data": data })).
            catch((err) => res.status(500).json({ "error": err }));
    });

}