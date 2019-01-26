const express = require("express"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  sessions = require("express-session"),
  mongoose = require("mongoose");
const seedDB = require("./models/seed"),
  Question = require("./models/question"),
  User = require("./models/user"),
  credentials = require("./credentials"),
  db = require("./config/keys").mongoURI;
// Routes
const mainRoutes = require("./routes");
const studentRoutes = require("./routes/students");
const adminRoutes = require("./routes/admin");
const edit = require("./routes/edit");

const app = express();

seedDB.seed(Question);

app.use(bodyParser.json());
app.use(cookieParser(credentials.cookieSecret));
app.use(sessions());
app.set("port", process.env.PORT || 5000);
app.use(express.static(__dirname + "/public"));

mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch(err => console.log(err));

app.use((req, res, next) => {
  res.locals.showTests =
    app.get("env") !== "production" && req.query.test === "1";
  next();
});

app.use(mainRoutes); //using index.js as an entry point for all types of users (guest, student and admin)
app.use("/student", studentRoutes); //using student.js to handle all pages that a student can access
app.use("/admin", adminRoutes); //Same idea as student.js
app.use("/admin/edit", edit);
//start
app.get("/question", function(req, res, next) {
  Question.find((err, question) => {
    if (err) console.log(err);
    else {
      // console.log(user);
      res.json(question);
    }
  });
});
//finish

// app.get('/', (req,res)=>{
//   res.
// })

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
