const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    id: {type: Number},
    name: { type: String},
    slug: {type: String, slug: 'name', unique: true},
});


const BrandModel = mongoose.model('Brand', BrandSchema);

module.exports = BrandModel;
