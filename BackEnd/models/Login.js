var mongoose = require('mongoose');
const Schema = mongoose.Schema;
//create the schema for user login and regestration
var user = new Schema({
    userId: { type: String },
    password: { type: String }
});
//export the file to use it in other javascript file
module.exports = mongoose.model('User', user);