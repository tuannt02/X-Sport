const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    // name: {type: String},
    // img: {type: String},
    id: {type: String},
    // price: {type: Number},
    // sold: {type: Number}
    img: {type: Array}
});

const ProductModel = mongoose.model('product',ProductSchema);

module.exports = ProductModel;
