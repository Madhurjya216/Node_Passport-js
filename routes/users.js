// models/User.js
const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/data_passport`);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  secret: String
});

userSchema.plugin(plm);

module.exports =  mongoose.model("MyData", userSchema);

