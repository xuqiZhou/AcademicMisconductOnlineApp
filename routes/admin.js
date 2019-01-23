const express = require("express"),
  router = express.Router(),
  urlencodedParser = require("body-parser").urlencoded({ extended: false }),
  cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser"),
  session = require("express-session"),
  credentials = require("../credentials");
// mongoose = require("mongoose");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser(credentials.cookieSecret));
router.use(session());

// router.use((req, res, next) => {
//   if (!res.locals.partials) res.locals.partials = {};
//   res.locals.partials.menuBar = menu.admin;
//   next();
// });

router.get("/", (req, res) => {
  res.json();
});

module.exports = router;
