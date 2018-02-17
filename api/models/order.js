const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    'shop': {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    },
    'customer': {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    'products': [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    'date': {
        type: Date,
        default: Date.now()
    },
    'status': {
        type: Number,
        default: 0
    }
}, { collection: 'Order', versionKey: false });//Number will changed to float(double) with NPM package

orderSchema.statics = {
    getOrders: function () {
        return this.find({}).exec();
    },
    getOrder: function (_id) {
        return this.find({ _id: _id }).exec();
    }
}

orderSchema.methods = {
    saveOrder: function () {
        return this.save();
    }
}

module.exports = mongoose.model('Order', orderSchema);