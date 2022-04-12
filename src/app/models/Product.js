const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    id: {type: Number},
    name: {type: String},
    img: {type: Array},
    price: {type: Number},
    size: {type: Array},
    color: {type: Array},
    brand: {type: String},
    total: {type: Number},
    sold: {type: Number},
    freeship: {type: Boolean},
    discount: {type: Number},
    start: {type: Number},
    slug: {type: String},
});

const ProductModel = mongoose.model('product',ProductSchema);

module.exports = ProductModel;
