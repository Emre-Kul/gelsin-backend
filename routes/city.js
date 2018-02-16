const city = require('../models/city.js');
module.exports = function (app) {
    app.get('/city/:_id', (req, res) => {
        city.getCity(req.params._id).
            then((cityData) => {
                res.status(200).json({
                    "status" : "success",
                    "data" : cityData
                })
            }).
            catch((err) => {
                res.status(400).json({
                    "status" : "error",
                    "error" : err
                });
            })
    });
}