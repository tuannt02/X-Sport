const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    id: {type: Number},
    name: { type: String},
});


const BrandModel = mongoose.model('Brand', BrandSchema);

module.exports = BrandModel;
