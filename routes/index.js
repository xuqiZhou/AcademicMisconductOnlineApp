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
      res.json(quizQuestions);
    }
  });
});

router.post("/handleregister", (req, res) => {
  console.log(req.body.email);
  console.log(req.body.password);
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log("!jskfjkdsjfkdsjkjfdskajfkdsjkafjskfjdasklfj");
      console.log(`Error finding user: ${user} Error: ${user}`);
    } else if (!user) {
      console.log("!user");
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

// router.post("/processlogin", function(req, res) {
//     User.findOne({ userName: req.body.userName }, (err, user) => {
//         if (err) console.log(`Error finding user: ${user}. Error: ${err}`);
//         else if (!user) res.render("login", { message: newDiv.passwordFalied });
//         else if (user.password === md5(req.body.password)) {
//             req.session.user = user;
//             if (user.role === "admin") res.redirect(303, "admin");
//             else res.redirect(303, "user");
//         } else res.render("login", { message: newDiv.passwordFalied });
//     });
// });

router.post("/processlogin", function(req, res) {
  console.log(req.body.userName);
});

module.exports = router;
