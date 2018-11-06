var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var student = new Schema({
    studentId: { type: String },
    name: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    course: { type: String },
    studentType: { type: String, default: 'Full time' }
});

module.exports = mongoose.model('Student', student);