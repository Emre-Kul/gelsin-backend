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
    getLocations: function () {
        return this.find({}).exec();
    },
    getLocation: function (_id) {
        return this.find({ _id: _id }).exec();
    }
}

locationSchema.methods = {
    saveLocation: function () {
        return this.save();
    }
}

module.exports = mongoose.model('Location', locationSchema);