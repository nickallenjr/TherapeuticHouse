// const mongoose = require("mongoose");
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    eventTitle: {
        type: String,
        required: true
    },

    eventDetails: {
        type: String,
        required: true
    },

    photo: {
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
        required: true,
    },

    city: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    }
})

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;