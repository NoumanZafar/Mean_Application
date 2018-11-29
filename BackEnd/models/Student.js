var mongoose = require('mongoose');
const Schema = mongoose.Schema;
//create the schema for the student
var student = new Schema({
    studentId: { type: String },
    name: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    course: { type: String },
    //provide the default value for the course
    studentType: { type: String, default: 'Full time' }
});
//export the schema to another file 
//give schema name to store in database
module.exports = mongoose.model('Student', student);