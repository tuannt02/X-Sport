const mongoose = require('mongoose');


const addressSchema = new mongoose.Schema({
    name: {type: String},
    phone: {type: String},
    province: {
        code: Number,
        name: String,
    },
    district: {
        code: Number,
        name: String,
    },
    ward: {
        code: Number,
        name: String,
    },
    street_detail: {type: String},
    full_addr: {type: String},
    is_default: {
        type: Boolean, 
        default: false,
    },
    user_id: {
        type: Object,
    }
});


const AddressModel = mongoose.model('Address', addressSchema);

module.exports = AddressModel;
