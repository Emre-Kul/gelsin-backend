const mongoose = require('mongoose');
const Schema = mongoose.schema;

const citySchema = new Schema({
    'name': {
        type: String,
        required: true
    },
});

citySchema.statics = {
    getCitys: function (limit) {
        return this.find({}).limit(limit).exec();
    },
    getCity: function (_id) {
        return this.find({ _id: _id }).exec();
    }
}

module.exports = mongoose.model('City', citySchema);