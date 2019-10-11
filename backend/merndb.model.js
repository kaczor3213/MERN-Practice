const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Vehicle = new Schema({
    todo_description: {
        type: String
    }
});

module.exports = mongoose.model('Vehicle', Vehicle);
