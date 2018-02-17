const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    'name': {
        type: String,
        required: true,
        unique: true
    },
    'loc': {
        type: [Number],
        index: '2dsphere'
    }
}, { collection: 'Customer', versionKey: false });//Number will changed to float(double) with NPM package

customerSchema.statics = {
    getCustomers: function () {
        return this.find({}).exec();
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