const express = require("express");
const router = express.Router();
const Module = require("../models/Module");

router.get("/", (req, res) => {
  Module.find().then(modules => res.json(modules));
});

router.get("/editmodule/:modulename", (req, res) => {
  Module.findOne({ title: req.params.modulename }, (err, module) => {
    if (err) console.log(`Error finding module: ${module} Error: ${module}`);
    else if (!module) res.json({ title: "", body: "" });
    else res.json(module);
  });
});

router.post("/", (req, res) => {
  new Module({
    title: req.body.title,
    body: req.body.body,
    public: req.body.public
  })
    .save()
    .then(module => res.json(module));
});

router.delete("/:id", (req, res) => {
  Module.findById(req.params.id)
    .then(module => module.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
