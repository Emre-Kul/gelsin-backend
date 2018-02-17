const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema({
    'name': {
        type: String,
        required: true
    },
    'category': {
        type: Schema.Types.ObjectId,
        ref: 'ShopCategory',
        required: true
    },
    'longitude': Number,
    'latitude': Number
}, { collection: 'Shop' });

shopSchema.statics = {
    getShops: function () {
        return this.find({}).populate('category').exec();
    },
    getShop: function (_id) {
        return this.find({ _id: _id }).exec();
    }
}

shopSchema.methods = {
    saveShop : function(){
        return this.save();
    }
}

module.exports = mongoose.model('Shop', shopSchema);