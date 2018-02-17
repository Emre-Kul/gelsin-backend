const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    'name': {
        type: String,
        required: true,
        unique: true
    },
}, { collection: 'Location', versionKey: false });

locationSchema.statics = {
    getLocations: function (query) {
        if(typeof query != "undefined" && typeof query['limit'] != "undefined"){
            query['limit'] = parseInt(query['limit']); 
            query['page'] = (typeof query['page'] != "undefined") ? parseInt(query['page']) : 0;
            return this.find({}).limit(query['limit']).skip(query['limit']*query['page']).exec();
        }
        return this.find({}).exec();
    },
    getLocation: function (_id) {
        return this.findOne({ _id: _id }).exec();
    }
}

locationSchema.methods = {
    saveLocation: function () {
        return this.save();
    }
}

module.exports = mongoose.model('Location', locationSchema);