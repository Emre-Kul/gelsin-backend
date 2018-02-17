const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
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
        return this.find({}).populate('customer').populate('shop').populate('products').exec();
    },
    getOrder: function (_id) {
        return this.findOne({ _id: _id }).exec();
    },
    getOrderByCustomerId: function (customerId) {
        return this.find({ "customer": customerId }).exec();
    }
}

orderSchema.methods = {
    saveOrder: function () {
        return this.save();
    }
}

module.exports = mongoose.model('Order', orderSchema);