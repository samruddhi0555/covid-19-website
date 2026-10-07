const mongoose = require("mongoose");

module.exports = mongoose.model("Comment", new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  createdAt: { type: Date, default: Date.now }
}));