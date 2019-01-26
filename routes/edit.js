const express = require("express");
const router = express.Router();
const Module = require("../models/Module");
const QuizQuestion = require("../models/QuizQuestion");

router.get("/", (req, res) => {
  Module.find().then(modules => res.json(modules));
});

// Get Module Content for id
router.get("/editmodule/:_id", (req, res) => {
  Module.findById(req.params._id, (err, module) => {
    if (err) console.log(`Error finding module: ${module} Error: ${module}`);
    else if (!module) res.json({ title: "", body: "" });
    else res.json(module);
  });
});

// Get Quiz Questions with module id
// router.get("/editmodule//quiz/:_id", (req, res) => {
//   Module.findById(req.params._id, (err, module) => {
//     if (err) console.log(`Error finding module: ${module} Error: ${module}`);
//     else if (!module) res.json({ title: "", body: "" });
//     else res.json(module);
//   });
// });

router.post("/", (req, res) => {
  new Module({
    moduleCode: req.body.moduleCode,
    title: req.body.title,
    body: req.body.body,
    public: req.body.public
  })
    .save()
    .then(module => res.json(module));
});

router.post("/editmodule/quiz/:_id", (req, res) => {
  console.log(req.body);
  new QuizQuestion({
    moduleId: req.body.moduleId,
    question: req.body.question,
    options: req.body.options
  })
    .save()
    .then(quizQuestion => res.json(quizQuestion));
});

router.post("/editmodule", (req, res) => {
  console.log(req.body._id);
  const updatedModule = {
    moduleCode: req.body.moduleCode,
    title: req.body.title,
    body: req.body.body,
    public: req.body.public
    // })
    //   .save()
    //   .then(module => res.json(module));
  };
  console.log(updatedModule);

  Module.findOneAndUpdate(
    { _id: req.body._id },
    updatedModule,
    (err, module) => {
      if (err) console.log(`Error finding module: ${module} Error: ${module}`);
      else res.json(module);
    }
  );
});

router.delete("/:id", (req, res) => {
  Module.findById(req.params.id)
    .then(module => module.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
