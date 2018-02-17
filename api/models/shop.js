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
    'loc': {
        type: [Number],
        index: '2dsphere'
    }
}, { collection: 'Shop', versionKey: false });

shopSchema.statics = {
    getShops: function () {
        return this.find({}).populate('category').populate('category').exec();
    },
    getShop: function (_id) {
        return this.findOne({ _id: _id }).populate('category').exec();
    },
    findNearShops: function (location, distance) {
        return this.where({
            'loc':
            {
                $near:
                {
                    $geometry: { "type": "Point", "coordinates": [location.latitude, location.longitude] },
                    $maxDistance: distance
                }
            }
        }).populate('category').exec();
    }
}

shopSchema.methods = {
    saveShop: function () {
        return this.save();
    }
}


module.exports = mongoose.model('Shop', shopSchema);