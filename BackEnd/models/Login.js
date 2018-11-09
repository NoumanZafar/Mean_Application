var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var user = new Schema({
    userId: { type: String },
    password: { type: String }
});

module.exports = mongoose.model('User', user);