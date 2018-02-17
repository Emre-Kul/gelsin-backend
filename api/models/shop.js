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
        return this.aggregate([
            {
                "$lookup": {
                    "from": "ShopCategory",
                    "localField": "category",
                    "foreignField": "_id",
                    "as": "category"
                }
            },
            { "$unwind": "$category" },
            {
                "$project": {
                    "name": "$name",
                    "category_name": "$category.name",
                    "category_id": "$category._id",
                    "latitude": {
                        "$arrayElemAt": ["$loc", 0]
                    },
                    "longitude": {
                        "$arrayElemAt": ["$loc", 1]
                    }
                }
            }
        ]).sort({ name: -1 }).exec();
    },
    getShop: function (shop_id) {
        return this.aggregate([
            {
                "$match": {
                    "_id": mongoose.Types.ObjectId(shop_id)
                }
            },
            {
                "$lookup": {
                    "from": "ShopCategory",
                    "localField": "category",
                    "foreignField": "_id",
                    "as": "category"
                }
            },
            { "$unwind": "$category" },
            {
                "$project": {
                    "name": "$name",
                    "category_name": "$category.name",
                    "category_id": "$category._id",
                    "latitude": {
                        "$arrayElemAt": ["$loc", 0]
                    },
                    "longitude": {
                        "$arrayElemAt": ["$loc", 1]
                    }
                }
            }
        ]).exec();
    },
    findNearShops: function (location, distance) {
        return this.aggregate([
            {
                "$geoNear": {
                    "near": { "type": "Point", "coordinates": [parseFloat(location.latitude) , parseFloat(location.longitude)] },
                    "distanceField": "dist.calculated",
                    "maxDistance": parseInt(distance),
                    "includeLocs": "dist.loc",
                    "spherical": true
                }
            },
            {
                "$lookup": {
                    "from": "ShopCategory",
                    "localField": "category",
                    "foreignField": "_id",
                    "as": "category"
                }
            },
            { "$unwind": "$category" },
            {
                "$project": {
                    "name": "$name",
                    "category_name": "$category.name",
                    "category_id": "$category._id",
                    "latitude": {
                        "$arrayElemAt": ["$loc", 0]
                    },
                    "longitude": {
                        "$arrayElemAt": ["$loc", 1]
                    },
                    "distance" : "$dist.calculated"
                }
            }
        ]).exec();
    }
}

shopSchema.methods = {
    saveShop: function () {
        return this.save();
    }
}


module.exports = mongoose.model('Shop', shopSchema);