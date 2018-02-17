const City = require('../models/city.js');
module.exports = function (app) {
    app.get('/city', (req, res) => {
        City.getCitys().
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
    app.post('/city/insert/', (req, res) => {
        let city = new City({
            'name': req.body.cityName
        });
        city.saveCity().
            then(data => {
                res.status(200).json({
                    "status": "success",
                    "data": data
                });
            }).
            catch(err => {
                res.status(500).json({
                    "status": "error",
                    "error": err
                });
            });
    });
    app.get('/city/:_id', (req, res) => {
        City.getCity(req.params._id).
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
            });
    });


}