const mongoose = require("mongoose");

const quizQuestionSchema = mongoose.Schema({
  qId: {
    type: Number,
    require: true
  },
  moduleId: {
    type: String,
    require: true
  },
  question: {
    type: String,
    require: true
  },
  correctId: {
    type: Number,
    require: true
  },
  options: {
    type: Array,
    require: true
  }
});

const QuizQuestion = mongoose.model("QuizQuestion", quizQuestionSchema);
module.exports = QuizQuestion;
