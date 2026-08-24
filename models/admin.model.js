const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  role: {
    type: String,
    enum: ["admin"],
    default: "admin",
  },
});

module.exports = mongoose.model("Admin", AdminSchema);