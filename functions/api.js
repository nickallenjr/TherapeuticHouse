
const express = require("express"),
    fs = require('fs'),
    bodyParser = require("body-parser"),
    {
        check,
        validationResult
    } = require("express-validator/check"),
    passport = require("passport"),
    mongoose = require("mongoose"),
    cors = require("cors"),
    path = require("path"),
    logger = require("morgan"),
    nodeMailer = require("nodemailer"),
    key = require("./nodemailerkeys.json"),
    serverless = require("serverless-http");
    // {SMTPClient} = require("emailjs")


    

const app = express();
const router = express.Router()
const port = process.env.PORT || 5000;

app.use(express.static("assets"));
app.use(cors());
app.options("/upcomingevents", cors())
const corsOptions = {
    origin: 'http://localhost:5000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Route for sending order emails to client
router.post('/order', [
    check("firstName", "Your name must only conatin letters").isAlpha(),
    check("lastName", "Your name must only conatin letters").isAlpha(),
    check("email", "Please enter a valid email address.").isEmail(),
    check("phone", "Please enter a valid phone number.").isMobilePhone(["en-US"])
], cors(), async function (req, res) {

    const objToArray = Object.entries(req.body);

    const itemsOrdered = [];

    //Put req.body entries that starts with numbers into an array for Array.mapping line 85
    for (let i = 0; i < objToArray.length; i++) {
        isNaN(objToArray[i][0]) ? "dont" : itemsOrdered.push(objToArray[i][1])
    }

    console.log("items ordered--", itemsOrdered);

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
               return `<li>${item.name}     qty. ${!(item.qty) ? 1 : item.qty}</li>`
            }).join("")}
        </ul>
    `;

    let itemsOrderedWithQty = [];

    itemsOrdered.forEach(item => {
        if (item.qty === undefined) {
            item.qty = '1';
            itemsOrderedWithQty.push(item);
        } else {
            itemsOrderedWithQty.push(item);
        }
    })

    let orderEntry = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        itemsOrdered: itemsOrderedWithQty
    }
    
    //Check for errors and package them and send to client-side
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            validate: errors.array()
        });
    } else {
        let transporter = await nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                // should be replaced with real sender's account
                user: 'therapeutichouse@gmail.com',
                pass: 'sjexjdaevtlhaedm',
                // serviceClient: key.client_id,
                // privateKey: key.private_key
            }
        });
        // const client = new SMTPClient({
        //     user: 'therapeutichouse@gmail.com',
        //     password: 'sjexjdaevtlhaedm',
        //     host: 'smtp.gmail.com',
        //     ssl: true,
        // });

        let mailOptions = {
            // should be replaced with real recipient's account
            from: 'Order@therapeutichouse <therapeutichouse@gmail.com>',
            to: 'therapeutichouse@gmail.com',
            subject: `${req.body.firstName + " " + req.body.lastName} has placed an order!`,
            html: orderEmailBody
        };
        // try {
        //     const message = await client.sendAsync({
        //     // should be replaced with real recipient's account
        //     from: 'Order@therapeutichouse <therapeutichouse@gmail.com>',
        //     to: 'therapeutichouse@gmail.com',
        //     subject: `${req.body.firstName + " " + req.body.lastName} has placed an order!`,
        //     html: orderEmailBody
        // });
        //     console.log(message);
        // } catch (err) {
        //     console.error(err);
        // }
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
        res.send({
            "success": "order placed"
        });
        res.end();
    }
});


//Route for contacting business owners
router.post('/contact', [
    check("name", "Your name must only conatin letters").matches(/^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/),
    check("name", "Please enter your first and last name.").contains(" "),
    check("email", "Please enter a valid email address.").isEmail(),
    check("message", "Please enter a message.").isLength({
        min: 20
    })
], cors(), function (req, res) {

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
                user: 'therapeutichouse@gmail.com',
                pass: 'sjexjdaevtlhaedm'
            }
        });
        let mailOptions = {
            // should be replaced with real recipient's account
            from: "Contact@therapeutichouse <therapeutichouse@gmail.com>",
            to: 'therapeutichouse@gmail.com',
            subject: `You have a new contact request from ${req.body.name}`,
            html: contactEmailBody
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
        res.send({
            "success": "Your message was sent"
        });
        res.end();
    }
});

app.use('/api/', router)

exports.handler = serverless(app)
