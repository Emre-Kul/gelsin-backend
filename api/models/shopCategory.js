const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopCategorySchema = new Schema({
    'name': {
        type: String,
        required: true
    },
}, { collection: 'ShopCategory', versionKey: false });

shopCategorySchema.statics = {
    getShopCategorys: function () {
        return this.find({}).exec();
    },
    getShopCategory: function (_id) {
        return this.find({ _id: _id }).exec();
    }
}

module.exports = mongoose.model('ShopCategory', shopCategorySchema);