const Location = require('../models/location.js');
module.exports = function (app) {

    app.get('/location', (req, res) => {
        Location.getLocations(req.query).
            then((data) => res.status(200).json({ "data": data })).
            catch((err) => res.status(500).json({ "error": err }));
    });
    
    app.post('/location/insert/', (req, res) => {
        let location = new Location({
            'name': req.body.name
        });
        location.saveLocation().
            then((data) => res.status(200).json({ "data": data })).
            catch((err) => res.status(500).json({ "error": err }));
    });
    

    app.get('/location/:_id', (req, res) => {
        Location.getLocation(req.params._id).
            then((data) => res.status(200).json({ "data": data })).
            catch((err) => res.status(500).json({ "error": err }));
    });

}