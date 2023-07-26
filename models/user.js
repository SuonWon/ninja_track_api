const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    fullName: {
        type: String,
        require: false
    },
    email: {
        type: String,
        require: false
    },
    phoneNo: {
        type: String,
        require: false
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;