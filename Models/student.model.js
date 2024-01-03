const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Student = new Schema({
    studentName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
const student = mongoose.model('student', Student);
module.exports = student;