const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../../config.js');

const customerSchema = new Schema({
    'name': {
        type: String,
        required: true,
        unique: true
    },
    'longitude': Number,
    'latitude' : Number
}, { collection: 'Customer', versionKey: false });//Number will changed to float(double) with NPM package

customerSchema.statics = {
    getCustomers: function () {
        return this.find({}).limit(CONFIG.MONGO_DEFAULT_LIMIT).exec();
    },
    getCustomer: function (_id) {
        return this.findOne({ _id: _id }).exec();
    }
}
customerSchema.methods = {
    saveCustomer: function () {
        return this.save();
    }
}
module.exports = mongoose.model('Customer', customerSchema);