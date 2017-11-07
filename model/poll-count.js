var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var pollCountSchema = new Schema({
    count: {type: Number}
});

module.exports = mongoose.model('Polls-count', pollCountSchema, 'polls-count');