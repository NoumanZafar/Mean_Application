/**
 * Import the packages
 */
var express = require('express');
var app = express();
var router = express.Router();

/**
 * Import the js file where the schema was created
 */
var Student = require('./models/Student.js');
var User = require('./models/Login.js');
var path = require('path');

/**
 * Import the body parser
 */
var bodyParser = require("body-parser");


/**
 * Create mongoose connection and provide the databse name
 * Once the connection is established provide the information message
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://nouman:nouman123@ds255970.mlab.com:55970/lab_with_mongodb', { useNewUrlParser: true });
var connection = mongoose.connection;

/**
 * Database connection is opend only once for all the request at the start
 */
connection.once('open', () => {
    console.log('MongoDB established the connection');
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Control the CORS (Control access origin)
 * As the application is accessing two diffrent platforms Client side and Server side
 * to access the both side wothout any conflicts use the header files.
 */
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/**
 * For user login the get request from server
 * where search the database and return the json data back
 */
router.route('/login').get((req, res) => {
    User.find((err, users) => {
        if (err)
            console.log(err)
        else
            res.json(users);
    });
});

/**
 * Register the information of the user as json data in database
 */
router.route('/login/register').post((req, res) => {
    var user = new User(req.body);
    user.save()
        .then(users => {
            res.status(200).json({ 'student': 'Added successfully' });
        })
        .catch(err => {
            res.status(400).send('Failed to create new student');
        });
});

/**
 * Get the student information baackas JSON data
 */
router.route('/students').get((req, res) => {
    Student.find((err, students) => {
        if (err)
            console.log(err)
        else
            res.json(students);
    });
});

/**
 * Search the student information based on their ID
 */
router.route('/students/:id').get((req, res) => {
    Student.findById(req.params.id, (err, student) => {
        if (err)
            console.log(err)
        else
            res.json(student);
    });
});

/**
 * Add new student information 
 */
router.route('/students/add').post((req, res) => {
    var student = new Student(req.body);
    student.save()
        .then(student => {
            res.status(200).json({ 'student': 'Added successfully' });
        })
        .catch(err => {
            res.status(400).send('Failed to create new student');
        });
});

/**
 * Edit or Update specific students information and save back in the database
 * Stendent can be searched by id
 */
router.route('/students/update/:id').post((req, res) => {
    Student.findById(req.params.id, (err, student) => {
        if (!student)
            return next(new Error('Could not load document'));
        else {
            student.studentId = req.body.studentId;
            student.name = req.body.name;
            student.address = req.body.address;
            student.phone = req.body.phone;
            student.email = req.body.email;
            student.course = req.body.course;
            student.studentType = req.body.studentType;

            //save the changes
            student.save().then(student => {
                res.json('Student Updated');
            }).catch(err => {
                res.status(400).send('Student Update Failed');
            });
        }
    });
});

/**
 * Delete the student by using their ID
 */
router.route('/students/delete/:id').get((req, res) => {
    Student.findByIdAndRemove({ _id: req.params.id }, (err, student) => {
        if (err)
            res.json(err);
        else
            res.json('Removed Successfully');
    });
});

app.use('/', router);
/**
 * Provid server a port number to communicate with the browser or other origins
 */
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Express Server listning at http://%s:%s", host, port)
})