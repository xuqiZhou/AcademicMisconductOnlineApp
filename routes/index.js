const express = require("express"),
  router = express.Router(),
  urlencodedParser = require("body-parser").urlencoded({ extended: false }),
  cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser"),
  session = require("express-session"),
  credentials = require("../credentials"),
  mongoose = require("mongoose");
const User = require("../models/user"),
  QuizQuestion = require("../models/QuizQuestion"),
  Module = require("../models/Module");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser(credentials.cookieSecret));
router.use(session());

router.get("/home", (req, res) => {
  Module.find().then(modules => res.json(modules));
});

router.get("/module/:moduleCode", (req, res) => {
  Module.findOne({ moduleCode: req.params.moduleCode }, (err, module) => {
    if (err) console.log(`Error finding module: ${module} Error: ${module}`);
    else if (!module) res.json({ errMessage: "Module d exist" });
    else res.json(module);
  });
});

router.get("/module/quiz/:moduleId", (req, res) => {
  QuizQuestion.find({ moduleId: req.params.moduleId }, (err, quizQuestions) => {
    if (err) console.log(`Error finding module: ${module} Error: ${module}`);
    else if (!quizQuestions) res.json({ errMassage: "Module Not Exist" });
    else {
      console.log(quizQuestions);
      res.json(quizQuestions);
    }
  });
});

router.post("/handleregister", (req, res) => {
  console.log(req.body.email);
  console.log(req.body.password);
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log(`Error finding user: ${user} Error: ${user}`);
    } else if (!user) {
      new User({
        email: req.body.email,
        password: req.body.password,
        type: "Student"
      })
        .save()
        .then(res.json({ success: true }));
    } else {
      res.json({ success: false, reason: "Email Taken" });
    }
  });
});

router.post("/processlogin", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) console.log(`Error finding user: ${user} Error: ${err}`);
    else if (!user) res.json({ success: false, errMassage: "User not exist" });
    else if (user.password === req.body.password) {
      req.session.user = user;
      if (user.type === "admin") res.json({ success: true, role: "admin" });
      // if (user.type === "admin") res.json(303, "admin");
      else res.json({ success: true, role: "student" });
    } else res.json({ success: false, errMassage: "Password not correct" });
  });
});

module.exports = router;

// username@webmail.uwinnipeg.ca
// aaaaaa1B
