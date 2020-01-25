const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        imageType: {
            type: String,
            required: true
        },
        imagePath: {
            type: String,
            required: true
        }
    },

    date: {
        type: Date,
        default: Date.now,
        required: true,
    },

    phone: {
        type: String,
        required: true
    },

    order: {
        type: Array,
        required: true
    }
})

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;