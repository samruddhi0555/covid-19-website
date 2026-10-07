const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(express.static("public"));

app.use("/api", require("./routes/auth"));
app.use("/api/comments", require("./routes/comments"));

mongoose.connect("mongodb://127.0.0.1:27017/covid19")
  .then(() => app.listen(3000, () => console.log("Running at http://localhost:3000")))
  .catch(err => console.error("MongoDB connection failed:", err.message));