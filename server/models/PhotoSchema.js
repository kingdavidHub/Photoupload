const { Schema, model } = require('mongoose');

const photoSchema = new Schema({
    photourl: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        default: '#photo upload'
    },
    date: {
        type: Date
    }
});



module.exports = model('Photo', photoSchema);