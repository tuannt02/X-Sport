const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    username: { type: String, maxlength: 255 },
    password: { type: String, maxLength: 600 },
});


const CustomerModel = mongoose.model('Customer', CustomerSchema);

module.exports = CustomerModel;
