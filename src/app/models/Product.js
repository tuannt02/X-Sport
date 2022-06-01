const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    id: {type: Number},
    name: {type: String},
    category: {type: String},
    brand: {type: String},
    price: {type: Number},
    total: {type: Number},
    discount: {type: Number},
    sold: {type: Number},
    // freeship: {type: Boolean},
    size: {type: Array},
    img: {type: Array},
    color: {type: Array},
    // start: {type: Number},
    slug: {type: String, slug: 'name', unique: true},
});

const ProductModel = mongoose.model('product',ProductSchema);

module.exports = ProductModel;
