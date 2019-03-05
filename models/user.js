const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  email: {
    //webmail
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  answer: {
    type: Array,
    required: false
  },
  lastSubmitedDate: {
    type: Date
  },
  certificate: { data: Buffer, contentType: String }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
