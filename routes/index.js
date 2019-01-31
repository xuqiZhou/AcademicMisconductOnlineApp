const express = require("express"),
  router = express.Router(),
  cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser"),
  jwt = require("jsonwebtoken");
credentials = require("../credentials");
const User = require("../models/user"),
  QuizQuestion = require("../models/QuizQuestion"),
  Module = require("../models/Module");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser(credentials.cookieSecret));
// router.use(session());

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

router.post("/getToken", (req, res) => {
  console.log("email: " + req.body.email);
  console.log(req.body.password);
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) console.log(`Error finding user: ${user} Error: ${user}`);
    else if (!user) res.json({ success: false, errMassage: "User Not Exist" });
    else {
      console.log(user);
      if (user.password === req.body.password) {
        let type = null;
        if (user.type === "admin") {
          console.log("IS ADMIN");
          type = "admin";
        } else {
          console.log("IS ADMIN");
          type = "student";
        }
        jwt.sign({ user, type }, type, { expiresIn: "3600s" }, (err, token) => {
          console.log("type " + type);
          res.status(200).json({ success: true, token, type: type });
        });
      } else {
        res.json({ success: false, errMassage: "Password Not Correct" });
      }
    }
  });
});

router.get("/getAuth", verifyToken, (req, res) => {
  console.log(`req.userRole: ${req.userRole}`);
  //depend on the role, change the secretkey.
  jwt.verify(req.token, req.userRole, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({ success: true });
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  const userRole = req.headers["role"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    req.userRole = userRole;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = router;
