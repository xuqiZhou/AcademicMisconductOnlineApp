const express = require("express"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  sessions = require("express-session"),
  mongoose = require("mongoose");
const seedDB = require("./models/seed"),
  User = require("./models/user"),
  Question = require("./models/question"),
  credentials = require("./credentials");
const app = express();

seedDB.seed(Question);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(credentials.cookieSecret));
app.use(sessions());
app.set("port", process.env.PORT || 5000);
app.use(express.static(__dirname + "/public"));

mongoose.connect(
  "mongodb+srv://xuqiZhou:xuqiZhou@sandbox-nkbkb.mongodb.net/AMOA?retryWrites=true"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.use((req, res, next) => {
  res.locals.showTests =
    app.get("env") !== "production" && req.query.test === "1";
  next();
});

const mainRoutes = require("./routes");
const studentRoutes = require("./routes/students");
const adminRoutes = require("./routes/admin");

app.use(mainRoutes); //using index.js as an entry point for all types of users (guest, student and admin)
app.use("/student", studentRoutes); //using student.js to handle all pages that a student can access
app.use("/admin", adminRoutes); //Same idea as student.js

//start
app.get("/question", function(req, res, next) {
  Question.find((err, user) => {
    if (err) console.log(err);
    else {
      console.log(user);
      res.json(user);
    }
  });
});
//finish

app.use(function(req, res) {
  res.status(404);
  res.end("404");
});

app.use(function(err, req, res, next) {
  res.status(500);
  console.error(err);
  res.send(err);
});

app.listen(app.get("port"), () => {
  console.log(`App listening on port: ${app.get("port")}`);
});
