/** @format */

// models/Event.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please enter the event name"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description"],
    },
    date: {
      type: Date,
      required: [true, "Please enter a date"],
    },
    time: {
      type: String,
      required: [true, "Please enter a time"],
    },
    location: {
      type: String,
      required: [true, "Please enter a location"],
    },
    bannerImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
