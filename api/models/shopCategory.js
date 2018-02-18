const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../../config.js');

const shopCategorySchema = new Schema({
    'name': {
        type: String,
        required: true
    },
}, { collection: 'ShopCategory', versionKey: false });

shopCategorySchema.statics = {
    getShopCategorys: function () {
        return this.find({}).limit(CONFIG.MONGO_DEFAULT_LIMIT).exec();
    },
    getShopCategory: function (_id) {
        return this.findOne({ _id: _id }).exec();
    }
}

module.exports = mongoose.model('ShopCategory', shopCategorySchema);