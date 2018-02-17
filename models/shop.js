const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema({
    'name': {
        type: String,
        required: true
    },
    'category':{
        type: Schema.Types.ObjectId,
        ref: 'ShopCategory'
    },
    'longitude': Number,
    'latitude': Number
}, { collection: 'Shop' });

shopSchema.statics = {
    getShops: function () {
        return this.find({}).populate('ShopCategory').exec();
    },
    getShop: function (_id) {
        return this.find({ _id: _id }).exec();
    }
}

module.exports = mongoose.model('Shop', shopSchema);