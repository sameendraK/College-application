const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Token = new Schema({
    token: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: false,
        default: false
    },
    userName: {
        type: String,
        required: true
    },
    isLoggedIn: {
        type: Boolean,
        required: false,
        default: false
    }
})
const token = mongoose.model('Token', Token);
module.exports = token;