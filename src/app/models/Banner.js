const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BannerSchema = new Schema({
    id: {type: Number},
    img: { type: String},
    type: {type: String},
});


const BannerModel = mongoose.model('Banner', BannerSchema);

module.exports = BannerModel;
