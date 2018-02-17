const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    'name': {
        type: String,
        required: true
    },
    'longitude': Number,
    'latitude': Number
}, { collection: 'Customer' });//Number will changed to float(double) with NPM package

customerSchema.statics = {
    getCustomers: function () {
        return this.find({}).exec();
    },
    getCustomer: function (_id) {
        return this.find({ _id: _id }).exec();
    }
}

module.exports = mongoose.model('Customer', customerSchema);