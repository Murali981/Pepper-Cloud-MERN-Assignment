// backend/models/Form.js
const mongoose = require("mongoose");

const inputSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["TEXT", "NUMBER", "EMAIL", "PASSWORD", "DATE"],
  },
  title: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
});

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  inputs: [inputSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Form", formSchema);
