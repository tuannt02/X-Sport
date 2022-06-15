const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    id: {type: Number},
    name: {type: String},
    img: { type: String},
    slug: {type: String, slug: 'name', unique: true},
});


const CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = CategoryModel;
