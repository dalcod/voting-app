var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var optionSchema = new Schema({
    name: {type: String},
    votes: {type: Number}
})
var pollSchema = new Schema({
    username: {type: String},
    title: {type: String, required: true},
    id: {type: Number, required: true},
    options: [optionSchema]
});

module.exports = mongoose.model('Polls', pollSchema);