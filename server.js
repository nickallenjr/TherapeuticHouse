// To Do List
// 2.Make route for accepting newsletter subscribers
// 2a.Make route for clients to login and add events
// 3.Make route for adding events based on user inputs
// 4.Make route for displaying events
// 5.Setup backend form validation

const express = require("express");
const fs = require('fs');
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
var logger = require("morgan");


const Event = require("./models/events.js")

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.options("/upcomingevents", cors())
var corsOptions = {
    origin: 'http://localhost:5000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));



// Database configuration with mongoose
mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/therapeutichouse"), { useMongoClient: true, useNewUrlParser: true };
var db = mongoose.connection;

db.on("error", function(error) {
    console.log("Database Error:", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
    console.log("Mongoose connection successful.");
});

app.get("/upcomingevents", cors(), function(req, res) {
    Event.find().sort({ _id: -1 }).limit(1).exec(function(err, doc) {
        if (err) {
            throw err
        }
        res.send(doc);

    })
})

app.get("/pastevents", cors(), function(req, res) {
    Event.count().exec(function(error, num) {
        if (error) throw error;
        var number = num;
        console.log(number)

        Event.find().sort({ _id: 1 }).limit(number - 1).exec(function(err, docs) {
            if (err) {
                throw err
            }
            res.send(docs)
        })

    })

})


app.listen(port, () => console.log(`Listening on port ${port}`));