const express = require("express"),
  router = express.Router(),
  bodyParser = require("body-parser"),
  jwt = require("jsonwebtoken"),
  path = require("path");
const User = require("../models/User"),
  QuizQuestion = require("../models/QuizQuestion"),
  Module = require("../models/Module"),
  Jimp = require("jimp"),
  sizeOf = require("image-size"),
  base64Img = require("base64-img");

router.use(bodyParser.urlencoded({ extended: false }));

// Get All Modules

router.get("/home", (req, res) => {
  Module.find().then(modules => res.json(modules));
});

// Get Module Data

router.get("/module/:moduleCode", (req, res) => {
  Module.findOne({ moduleCode: req.params.moduleCode }, (err, module) => {
    if (err) console.log(`Error finding module: ${module} Error: ${module}`);
    else if (!module) res.json({ errMessage: "Module d exist" });
    else res.json(module);
  });
});

// Get Quiz Data

router.get("/module/quiz/:moduleId", (req, res) => {
  QuizQuestion.find({ moduleId: req.params.moduleId }, (err, quizQuestions) => {
    if (err) console.log(`Error finding module: ${module} Error: ${module}`);
    else if (!quizQuestions) res.json({ errMessage: "Module Not Exist" });
    else {
      res.json(quizQuestions);
    }
  });
});

// Get Student info

router.get("/studentinfo/:userId", (req, res) => {
  let info = {
    modules: null,
    student: null
  };
  const getStudent = () => {
    return new Promise((resolve, reject) => {
      User.findById(req.params.userId, (err, student) => {
        if (err)
          console.log(`Error finding students: ${student} Error: ${err}`);
        else if (!student)
          res.json({ errMassage: "No Student in the database" });
        else {
          resolve(student);
        }
      });
    });
  };
  const getModule = () => {
    return new Promise((resolve, reject) => {
      Module.find({ public: true }, (err, modules) => {
        if (err) console.log(`Error finding modules: ${modules} Error: ${err}`);
        else if (!modules)
          res.json({ errMassage: "No Module in the database" });
        else {
          resolve(modules);
        }
      });
    });
  };
  getModule().then(modules => {
    info.modules = modules;
    getStudent().then(student => {
      info.student = student;
      res.json(info);
    });
  });
});

// Handle Register

router.post("/handleregister", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log(`Error finding user: ${user} Error: ${user}`);
    } else if (!user) {
      new User({
        email: req.body.email,
        password: req.body.password,
        certificate: null,
        type: "student"
      })
        .save()
        .then(res.json({ success: true }));
    } else {
      res.json({ success: false, reason: "Email Taken" });
    }
  });
});

// Handle Certificate

router.post("/handlecertificate", (req, res) => {
  let imgRaw = "img/raw/CertificateTemplate.jpg";
  let imgActive = "img/active/image.jpg";
  const fileName = req.body._id; // + Date.now();

  let imgExported = `img/export/${fileName}.jpg`;
  var dimen = sizeOf(imgRaw);
  let width = dimen.width;
  let height = dimen.height;
  let textData = {
    text: req.body.name, //Text to render
    maxWidth: width - (5 + 5), //image width - L and R margins
    maxHeight: height - (5 + 5), //image height - margins
    placementX: 10, // 10 px L margin
    placementY: height - (height - (5 + 5)) + 650 // bottom of image = imgHeight - maxHeight + margin (to determine exact placement)
  };
  Jimp.read(imgRaw)
    .then(tpl => tpl.clone().write(imgActive))
    .then(() => Jimp.read(imgActive))
    .then(tpl => Jimp.loadFont("img/NameFont.fnt").then(font => [tpl, font]))
    .then(data => {
      tpl = data[0];
      font = data[1];
      return tpl.print(
        font,
        textData.placementX,
        textData.placementY,
        {
          text: textData.text,
          alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: Jimp.VERTICAL_ALIGN_TOP
        },
        textData.maxWidth,
        textData.maxHeight
      );
    })
    .then(tpl => tpl.quality(20).write(imgExported))
    .catch(err => {
      console.error(err);
    });
  const filePath = path.join(__dirname, `../img/export/${fileName}.jpg`);

  setTimeout(() => {
    base64Img.base64(filePath, (err, data) => {
      if (err) console.log(err);
      else {
        User.findOneAndUpdate(
          { _id: req.body._id },
          { certificate: data },
          (err, user) => {
            if (err) console.log(`Error finding user: ${user} Error: ${user}`);
            else if (!user)
              res.json({ success: false, errMessage: "User Not Exist" });
            else {
              email = user.email;
              password = user.password;
              res.json(data);
            }
          }
        );
      }
    });
  }, 3000);
});

// Get Scores

router.post("/manageScore", (req, res) => {
  let newAnswer = {
    moduleId: req.body.moduleId,
    module: req.body.moduleCode,
    score: req.body.score,
    date: req.body.lastSubmitedDate
  };
  User.findOneAndUpdate(
    { email: req.body.email },
    {
      $push: { answer: newAnswer },
      lastSubmitedDate: req.body.lastSubmitedDate
    },
    (err, user) => {
      if (err) console.log(`Error finding user: ${user} Error: ${user}`);
      else if (!user)
        res.json({ success: false, errMessage: "User Not Exist" });
      else {
        answer = user.answer;
      }
    }
  );
});

// Handle Password Change

router.post("/changepassword", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) console.log(`Error finding user: ${user} Error: ${user}`);
    else if (!user) res.json({ success: false, errMessage: "User Not Exist" });
    else {
      if (user.password !== req.body.oldPassword)
        res.json({ success: false, errMessage: "Wrong Password" });
      else {
        user.password = req.body.newPassword;
        user.save((err, newUser) => {
          if (err) return handleError(err);
          res.json(newUser);
        });
      }
    }
  });
});

// Authentication

router.post("/getToken", (req, res) => {
  console.log("inside getToken");

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) console.log(`Error finding user: ${user} Error: ${user}`);
    else if (!user) res.json({ success: false, errMessage: "User Not Exist" });
    else {
      if (user.password === req.body.password) {
        let type = null;
        const email = req.body.email;
        if (user.type === "admin") type = "admin";
        else type = "student";
        user.certificate = null;
        jwt.sign(
          { user, type },
          type,
          { expiresIn: "43200s" },
          (err, token) => {
            res.status(200).json({ success: true, token, type, email });
          }
        );
      } else {
        res.json({ success: false, errMessage: "Password Not Correct" });
      }
    }
  });
});

router.get("/getAuth", verifyToken, (req, res) => {
  jwt.verify(req.token, req.userRole, (err, authData) => {
    if (err) res.status(403).json({ success: false });
    else res.json({ success: true, authData });
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
