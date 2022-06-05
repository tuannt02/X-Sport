const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userID: {type: String},
    size: {type: String},
    color: {type: String},
    Quatity: {type: Number},
    productID:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    }]
});

const CartModel = mongoose.model('cart',CartSchema);

module.exports = CartModel;
