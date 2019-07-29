const express = require("express"),
    fs = require('fs'),
    bodyParser = require("body-parser"),
    { check, validationResult } = require("express-validator/check"),
    passport = require("passport"),
    mongoose = require("mongoose"),
    cors = require("cors"),
    path = require("path"),
    logger = require("morgan"),
    nodeMailer = require("nodemailer"),
    key = require("./nodemailerkeys.json");


const Event = require("./models/events.js")

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static("assets"));
app.use(cors());
app.options("/upcomingevents", cors())
const corsOptions = {
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

//Route for sending order emails to client
app.post('/order', [
    check("firstName").isAlpha().withMessage("Your name must only conatin letters"),
    check("lastName").isAlpha().withMessage("Your name must only conatin letters"),
    check("email").isEmail().withMessage("Please enter a valid email address."),
    check("phone").isMobilePhone(["en-US"]).withMessage("Please enter a valid phone number.")
], cors(), function(req, res) {

    const objToArray = Object.entries(req.body);
    console.log(objToArray);
    const itemsOrdered = [];

    for (let i = 0; i < objToArray.length; i++) {
        console.log(isNaN(objToArray[i][0]))
        isNaN(objToArray[i][0]) ? "dont" : itemsOrdered.push(objToArray[i][1])
         
    }
    
    console.log(itemsOrdered); 
    
    const orderEmailBody = `
        <h2>You have a new order placed</h2> 
        <h3>Contact Info</h3>
        <ul style="list-style-type:none">
            <li>Name: ${req.body.firstName + " " + req.body.lastName}</li>
            <li>Email: ${req.body.email}</li>
            <li>Phone: ${req.body.phone}</li>
        </ul>
        <h3>Order Details</h3>
        <ul style="list-style-type:none">
            ${itemsOrdered.map(item => {
               return `<li>${item}</li>`
            })}
        </ul>
    `;

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
                user: 'nicholasallenjr@gmail.com',
                pass: 'nlck30o0',
                // serviceClient: key.client_id,
                // privateKey: key.private_key
            }
        });
        let mailOptions = {
            // should be replaced with real recipient's account
            from: 'Order@therapeutichouse <nicholasallenjr@gmail.com>',
            to: 'nicholasallenjr@gmail.com',
            subject: `${req.body.firstName + " " + req.body.lastName} has placed an order!`,
            html: orderEmailBody
          };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
        res.send({"success":"order placed"});
        res.end();
    }
});


//Route for contacting business owners
app.post('/contact', [
    check("name").matches(/^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/).withMessage("Your name must only conatin letters"),
    check("name").contains(" ").withMessage("Please enter your first and last name."),
    check("email").isEmail().withMessage("Please enter a valid email address."),
    check("message").isLength({min:20}).withMessage("Please enter a message.")
], cors(), function(req, res) {

    console.log(req.body);

    const contactEmailBody = `
        <h2>You have a new contact</h2> 
        <h3>Contact Info</h3>
        <ul style="list-style-type:none">
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Message: ${req.body.message}</li>
        </ul>
    `;

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
                user: 'nicholasallenjr@gmail.com',
                pass: 'nlck30o0'
            }
        });
        let mailOptions = {
            // should be replaced with real recipient's account
            from: "Contact@therapeutichouse <nicholasallenjr@gmail.com>",
            to: 'nicholasallenjr@gmail.com',
            subject: `You have a new contact request from ${req.body.name}`,
            html: contactEmailBody
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
        res.send({"success":"Your message was sent"});
        res.end();
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