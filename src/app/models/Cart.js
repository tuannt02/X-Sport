const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userID: {type: String},
    size: {type: String},
    color: {type: String},
    quantity: {type: Number},
    productID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    },
    isComplete: {type: Boolean, default: false}
});

const CartModel = mongoose.model('cart',CartSchema);

module.exports = CartModel;
