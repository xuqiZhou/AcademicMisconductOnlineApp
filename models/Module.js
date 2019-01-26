const mongoose = require("mongoose");

const moduleSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  body: {
    type: String,
    require: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  public: {
    type: Boolean,
    default: false,
    require: true
  }
});

const Module = mongoose.model("Module", moduleSchema);
module.exports = Module;
