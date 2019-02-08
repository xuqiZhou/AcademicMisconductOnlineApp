const express = require("express");
const router = express.Router();
const Module = require("../models/Module");
const User = require("../models/User");
const QuizQuestion = require("../models/QuizQuestion");

// Get All Modules
router.get("/", (err, res) => {
  Module.find((err, modules) => {
    if (err) console.log(err);
    else {
      res.json(modules);
    }
  });
});

// Get Module Content
router.get("/editmodule/:_id", (req, res) => {
  Module.findById(req.params._id, (err, module) => {
    if (err) console.log(`Error finding module: ${module} Error: ${module}`);
    else if (!module) res.json({ title: "", body: "" });
    else res.json(module);
  });
});

// Get Quiz Questions
router.get("/editmodule/quiz/:_id", (req, res) => {
  QuizQuestion.find({ moduleId: req.params._id }, (err, quizQuestions) => {
    if (err) console.log(`Error finding module: ${module} Error: ${module}`);
    else if (!quizQuestions) res.json({ errMassage: "Module Not Exist" });
    else {
      res.json(quizQuestions);
    }
  });
});

// Get Quiz Questions
router.get("/editmodule/quiz/question/:_id", (req, res) => {
  QuizQuestion.findById(req.params._id, (err, question) => {
    if (err)
      console.log(`Error finding question: ${question} Error: ${question}`);
    else if (!question) res.json({ errMassage: "Question not found" });
    else res.json(question);
  });
});

// Get info for studentScore page
router.get("/getinfo", (req, res) => {
  let info = {
    modules: null,
    students: null
  };
  const getStudent = () => {
    return new Promise((resolve, reject) => {
      User.find({ type: "student" }, (err, students) => {
        if (err)
          console.log(`Error finding students: ${students} Error: ${err}`);
        else if (!students)
          res.json({ errMassage: "No Student in the database" });
        else {
          resolve(students);
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
    getStudent().then(students => {
      info.students = students;
      res.json(info);
    });
  });
});

// Post new Module
router.post("/", (req, res) => {
  Module.findOne({ moduleCode: req.body.moduleCode }, (err, module) => {
    if (err) console.log(`Error finding module: ${module} Error: ${module}`);
    else if (!module) {
      new Module({
        moduleCode: req.body.moduleCode,
        title: req.body.title,
        body: req.body.body,
        public: req.body.public
      })
        .save()
        .then(module => res.json(module));
    } else {
      res.json({ errMassage: "Module Code Exists" });
    }
  });
});

// Post new Quiz Question
router.post("/editmodule/quiz/:_id", (req, res) => {
  new QuizQuestion({
    moduleId: req.body.moduleId,
    question: req.body.question,
    options: req.body.options
  })
    .save()
    .then(quizQuestion => res.json(quizQuestion));
});

// Update Existing Module
router.post("/editmodule", (req, res) => {
  const updatedModule = {
    moduleCode: req.body.moduleCode,
    title: req.body.title,
    body: req.body.body,
    public: req.body.public,
    lastModified: req.body.lastModified
  };
  Module.findOneAndUpdate(
    { _id: req.body._id },
    updatedModule,
    (err, module) => {
      if (err) console.log(`Error finding module: ${module} Error: ${module}`);
      else res.json(module);
    }
  );
});

// Change Module Status
router.post("/editmodule/updatestatus", (req, res) => {
  const newStatus = {
    public: req.body.public
  };
  Module.findOneAndUpdate({ _id: req.body._id }, newStatus, (err, module) => {
    if (err) console.log(`Error finding module: ${module} Error: ${module}`);
    else res.json({ updateSuccess: true });
  });
});

// Update Existing Quiz Question
router.post("/editmodule/editquiz/:_id", (req, res) => {
  const updatedQuestion = {
    question: req.body.question,
    options: req.body.options
  };
  QuizQuestion.findOneAndUpdate(
    { _id: req.body._id },
    updatedQuestion,
    (err, question) => {
      if (err)
        console.log(`Error finding question: ${question} Error: ${question}`);
      else res.json(question);
    }
  );
});

// Handle delete module with id
router.delete("/delete/:id", (req, res) => {
  Module.findById(req.params.id)
    .then(module => module.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// Handle delete quiz questions
router.delete("/editmodule/quiz/delete/:id", (req, res) => {
  QuizQuestion.findById(req.params.id)
    .then(question => question.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
