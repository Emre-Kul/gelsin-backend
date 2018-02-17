const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    'name': {
        type: String,
        required: true
    },
    'price': {
        type: Number,
        default: 0.0
    },
    'shop': {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    }
}, { collection: 'Product', versionKey: false });

productSchema.statics = {
    getProducts: function () {
        return this.find({}).populate('shop').exec();
    },
    getProduct: function (_id) {
        return this.find({ _id: _id }).exec();
    }
}

productSchema.methods = {
    saveProduct: function () {
        return this.save();
    }
}

module.exports = mongoose.model('Product', productSchema);