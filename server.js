// To Do List
// 2.Make route for accepting newsletter subscribers
// 2a.Make route for clients to login and add events
// 3.Make route for adding events based on user inputs
// 4.Make route for displaying events
// 5.Setup backend form validation

const express = require("express"),
    fs = require('fs'),
    bodyParser = require("body-parser"),
    { check, validationResult } = require("express-validator/check"),
    passport = require("passport"),
    mongoose = require("mongoose"),
    cors = require("cors"),
    path = require("path"),
    logger = require("morgan"),
    nodeMailer = require("nodemailer");


const Event = require("./models/events.js")

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.options("/upcomingevents", cors())
var corsOptions = {
    origin: 'http://localhost:5000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// app.use(express.static("src"));

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());



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

//Route for sending email to client
app.post('/order', [
    check("username").isAlpha().withMessage("Your name must only conatin letters"),
    check("email").isEmail().withMessage("Please enter a valid email address."),
    check("phone").isMobilePhone(["en-US"]).withMessage("Please enter a valid phone number.")
], cors(), function(req, res) {

    console.log(req.body);

    //Check for errors and package them and send to client-side
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            validate: errors.array()
        });
    } else {
        let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                // should be replaced with real sender's account
                user: 'mrnallenjr@gmail.com',
                pass: 'N!ckAidanAsherah'
            }
        });
        let mailOptions = {
            // should be replaced with real recipient's account
            to: 'nicholasallenjr@gmail.com',
            subject: "Order",
            body: req.body
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
        // res.writeHead(301, { Location: 'index.html' });
        // res.end();
    }
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