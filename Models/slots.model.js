const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Slot = new Schema({
    slot: {
        type: Number,
        required: true,
    },
    employee: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true
    },
    user: {
        type: String,
        required: false
    }

})
const slot = mongoose.model('Slot', Slot);
module.exports = slot;