// const express = require("express"),
//   app = require("express")(),
//   // hbs = require("express-handlebars").create({
//   //   defaultLayout: "main",
//   //   extname: "hbs"
//   // }),
//   // md5 = require('md5'),
//   bodyParser = require("body-parser"),
//   cookieParser = require("cookie-parser"),
//   sessions = require("express-session"),
//   // menu = require("./models/menu.json"),
//   // credentials = require("./credentials"),
//   // User = require("./models/user"),
//   // Post = require("./models/post"),
//   // seedDB = require("./models/seed"),
//   mongoose = require("mongoose");

// // seedDB.seed(User);
// app.use(bodyParser.urlencoded({ extended: false }));
// // app.use(cookieParser(credentials.cookieSecret));
// app.use(sessions());

// // app.engine("hbs", hbs.engine);
// // app.set("view engine", "hbs");
// app.set("port", process.env.PORT || 3023);
// app.use(express.static(__dirname + "/public"));

// // mongoose.connect('mongodb://127.0.0.1:20024/A3');
// // mongoose.connect("mongodb://localhost:27017/A3");
// // const db = mongoose.connection;
// // db.on("error", console.error.bind(console, "connection error:"));

// app.use(function(req, res, next) {
//   res.locals.showTests =
//     app.get("env") !== "production" && req.query.test === "1";
//   next();
// });

// const mainRoutes = require("./routes"),
//   userRoutes = require("./routes/user"),
//   adminRoutes = require("./routes/admin");

// app.use(mainRoutes);
// app.use("/user", userRoutes);
// app.use("/admin", adminRoutes);

// app.use(function(req, res) {
//   res.status(404);
//   res.render("404");
// });

// app.use(function(err, req, res, next) {
//   res.status(500);
//   console.error(err);
//   res.send(err);
// });

// app.listen(app.get("port"), () => {
//   console.log(`App listing on port :${app.get("port")}`);
// });
