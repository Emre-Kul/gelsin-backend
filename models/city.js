const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    'name': {
        type: String,
        required: true,
        unique: true
    },
}, { collection: 'City' });

citySchema.statics = {
    getCitys: function () {
        return this.find({}).exec();
    },
    getCity: function (_id) {
        return this.find({ _id: _id }).exec();
    }
}

citySchema.methods = {
    saveCity: function () {
        return this.save();
    }
}

module.exports = mongoose.model('City', citySchema);