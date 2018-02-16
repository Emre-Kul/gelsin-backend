const city = require('../models/city.js');
module.exports = function (app) {
    app.get('/city', (req, res) => {
        city.getCitys().
            then((data) => {
                res.status(200).json({
                    "status": "success",
                    "data": data
                });
            }).
            catch((err) => {
                res.status(400).json({
                    "status": "error",
                    "error": err
                });
            });

    });
    app.get('/city/:_id', (req, res) => {
        city.getCity(req.params._id).
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