const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    'name': {
        type: String,
        required: true
    },
    'price':{
        type: Number,
        default : 0.0
    },
    'shop-id':{
        type : Schema.Types.ObjectId,
        ref : 'Shop'
    }
}, { collection: 'Product' });

productSchema.statics = {
    getProducts: function () {
        return this.find({}).exec();
    },
    getProduct: function (_id) {
        return this.find({ _id: _id }).exec();
    }
}

module.exports = mongoose.model('Product', productSchema);