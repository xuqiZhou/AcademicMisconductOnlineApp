const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    uId: {
        type: String,
        required: true
    },
    userName: {
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
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
