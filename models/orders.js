const mongoose = require("mongoose");
// import mongoose from "mongoose";

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
        type: String,
        required: true
    },
    
    phone: {
        type: Number,
        required: true
    },

    itemsOrdered: {
        type: Array,
        required: true,
    },
})

const Orders = mongoose.model("Orders", orderSchema);

module.exports = Orders;