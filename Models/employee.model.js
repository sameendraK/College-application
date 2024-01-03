let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Employee = new Schema({
    name: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        required: false
    }
})
const employee = mongoose.model('Employee', Employee);
module.exports = employee;