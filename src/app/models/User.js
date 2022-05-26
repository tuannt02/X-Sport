const mongoose = require('mongoose');
const { isEmail } = require('validator'); 
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: [true, "Vui lòng nhập email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Vui lòng nhập một email hợp lệ"],
    },
    password: {
        type: String,
        require: [true, "Vui lòng nhập password"],
        minlength: [8, "Mật khẩu tối thiểu là 8 ký tự"],
    },
})

// fire a function after doc saved to db
userSchema.post('save', function(doc, next)  {
    console.log('new user was created & saved', doc);
    next();
})

// fire a function before doc saved to db
userSchema.pre('save', async function(next)   {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;