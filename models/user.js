const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    required: true
  },
  write: {
    type: Boolean,
    required: true
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
