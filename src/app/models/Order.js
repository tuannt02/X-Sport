const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userID: { type: String },
    address: { type: String },
    phone: { type: String },
    customerName: { type: String },
    cartID: 
    [{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'cart',
    }],
    note: { type: Array },
    datePurChase: { type: Date },
    DeliverStatus: { type: Number },
    DeliverMethod: {type: String},
    TotalPrice: {type: Number}
});

const OrderModel = mongoose.model('order', OrderSchema);

module.exports = OrderModel;
