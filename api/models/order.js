const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    'customer': {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    'shop': {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
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
        return this.find({}).populate('customer').sort({ date: -1 }).populate('shop').populate('products').exec();
    },
    getOrder: function (_id) {
        return this.findOne({ _id: _id }).populate('customer').populate('shop').populate('products').exec();
    },
    getOrderByCustomerId: function (customerId) {
        return this.find({ "customer": customerId }).sort({ date: -1 }).populate('customer').populate('shop').populate('products').exec();
    },
    getOrderByShopId: function (shopId) {
        return this.find({ "shop": shopId }).sort({ date: -1 }).populate('customer').populate('shop').populate('products').exec();
    },
    completeOrder: function (_id) {
        return this.update({ _id: _id }, { $set: { status: 1 } });
    }
}

orderSchema.methods = {
    saveOrder: function () {
        return this.save();
    }
}

module.exports = mongoose.model('Order', orderSchema);