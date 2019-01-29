// /* jshint ignore:start */
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Route from "react-router-dom/Route";
// App Components
import Register from "./components/Register";
import EditQuiz from "./components/EditQuizPage";
import Home from "./components/Home";
import Module from "./components/Module";
import QuizPage from "./components/QuizPage";
import EditPage from "./components/EditPage";
import CreateModule from "./components/CreateModule";
import StudentScore from "./components/StudentScore";
import ForgetPassword from "./components/ForgetPassword";

import "./App.css";
import EntryPage from "./components/EntryPoint";

class App extends Component {
  state = {
    // userStatus: "guest",
    // role: "student"
  };
  //   render() {
  //     return (
  //       <Router>
  //         <div>
  //           <Redirectsss />
  //         </div>
  //       </Router>
  //     );
  //   }
  // }
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={EntryPage} />
          <Route exact path="/forgetpassword" component={ForgetPassword} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home" render={() => <Home role="guest" />} />
          <Route
            exact
            path="/module/:moduleName"
            render={({ match }) => (
              <Module role="guest" moduleCode={match.params.moduleName} />
            )}
          />
          <Route
            path="/module/:moduleCode/quiz"
            render={({ match }) => (
              <QuizPage role="guest" moduleCode={match.params.moduleCode} />
            )}
          />
          {/* student routes */}
          <Route
            exact
            path="/student/home"
            render={() => <Home role="student" />}
          />
          <Route
            exact
            path="/student/module/:moduleName"
            render={({ match }) => (
              <Module role="student" moduleCode={match.params.moduleName} />
            )}
          />
          <Route
            path="/student/module/:moduleCode/quiz"
            render={({ match }) => (
              <QuizPage role="student" moduleCode={match.params.moduleCode} />
            )}
          />
          {/* admin routes */}
          <Route
            exact
            path="/admin/home"
            render={() => <Home role="admin" />}
          />
          <Route
            exact
            path="/admin/module/:moduleName"
            render={({ match }) => (
              <Module role="admin" moduleCode={match.params.moduleName} />
            )}
          />
          <Route
            path="/admin/module/:moduleCode/quiz"
            render={({ match }) => (
              <QuizPage role="admin" moduleCode={match.params.moduleCode} />
            )}
          />
          <Route
            exact
            path="/admin/edit"
            render={({ match }) => <EditPage role="admin" />}
          />
          <Route
            exact
            path="/admin/edit/editmodule/:_id"
            render={({ match }) => (
              <CreateModule role="admin" _id={match.params._id} />
            )}
          />
          <Route
            path="/admin/edit/editmodule/quiz/:_id"
            render={({ match }) => (
              <EditQuiz role="admin" _id={match.params._id} />
            )}
          />
          <Route
            exact
            path="/admin/studentscore"
            render={({ match }) => <StudentScore role="admin" />}
          />
        </div>
      </Router>
    );
  }
}
// function loadModule({ match }) {
//   return <Module moduleName={match.params.moduleName} />;
// }
export default App;
