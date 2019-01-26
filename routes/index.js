const express = require("express"),
    router = express.Router(),
    urlencodedParser = require("body-parser").urlencoded({ extended: false }),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    session = require("express-session"),
    credentials = require("../credentials"),
    mongoose = require("mongoose");
const User = require("../models/user");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser(credentials.cookieSecret));
router.use(session());

// router.use((req, res, next) => {
//   if (!res.locals.partials) res.locals.partials = {};
//   res.locals.partials.menuBar = menu.admin;
//   next();
// });

router.get("/", (req, res) => {
    res.end("home");
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
