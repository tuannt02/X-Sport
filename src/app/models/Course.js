const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, maxlength: 255 },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxlength: 255},
    createAt: {type: String, default: Date.now},
    updateAt: {type: String, default: Date.now},
});

module.exports = mongoose.model('Course', Course);
