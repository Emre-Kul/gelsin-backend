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
        return this.find({}).exec();
    },
    getProduct: function (_id) {
        return this.findOne({ _id: _id }).exec();
    },
    getProductsOfShop: function (shopId) {
        return this.find({ "shop": shopId }).exec();
    },
    removeProduct: function (_id) {
        return this.findByIdAndRemove(_id).exec();
    },
    editProduct: function (_id, refreshedProduct) {
        return this.findByIdAndUpdate(_id, refreshedProduct).exec();
    },
    searchProductByName: function(search_name){
        return this.find({"name" : {"$regex" : search_name, "$options" : "i"} }).exec();
    }
}

productSchema.methods = {
    saveProduct: function () {
        return this.save();
    }
}

module.exports = mongoose.model('Product', productSchema);