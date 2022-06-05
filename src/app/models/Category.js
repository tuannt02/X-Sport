const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    id: {type: Number},
    name: {type: String},
    img: { type: String},
    slug: {type: String},
});


const CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = CategoryModel;
