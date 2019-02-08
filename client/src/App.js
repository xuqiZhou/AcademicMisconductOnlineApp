// /* jshint ignore:start */
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
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
import Login from "./components/Login";
import ChangePassword from "./components/ChangePassword";
import QuizResult from "./components/QuizResultPage";
import GradePage from "./components/GradePage";
import AuthComponent from "./components/AuthComponent";

const NoMatch = () => (
  <div>
    <Redirect to="/" />
  </div>
);

class App extends Component {
  state = { role: localStorage.getItem("role") };

  LoginSuccess = () => {
    this.setState({ role: localStorage.getItem("role") });
  };

  getRoutes() {
    if (this.state.role === "student") {
      return (
        <React.Fragment>
          <AuthComponent userType={this.state.role}>
            <Switch>
              <Route
                exact
                strict
                path="/student/home"
                render={() => <Home type="student" />}
              />
              <Route
                exact
                path="/student/module/:moduleName"
                render={({ match }) => (
                  <Module type="student" moduleCode={match.params.moduleName} />
                )}
              />
              <Route
                exact
                path="/student/module/:moduleCode/quiz"
                render={({ match }) => (
                  <QuizPage
                    type="student"
                    moduleCode={match.params.moduleCode}
                  />
                )}
              />
              <Route
                exact
                strict
                path="/student/quizresult/:moduleId"
                render={({ match }) => (
                  <QuizResult type="student" moduleId={match.params.moduleId} />
                )}
              />
              <Route
                exact
                strict
                path="/student/mygrades/:userId"
                render={({ match }) => (
                  <GradePage type="student" userId={match.params.userId} />
                )}
              />{" "}
              <Route component={NoMatch} />
            </Switch>
          </AuthComponent>
        </React.Fragment>
      );
    } else if (this.state.role === "admin") {
      return (
        <React.Fragment>
          <AuthComponent userType={this.state.role}>
            <Switch>
              <Route
                exact
                path="/admin/home"
                render={() => <Home type="admin" />}
              />
              <Route
                exact
                path="/admin/module/:moduleName"
                render={({ match }) => (
                  <Module type="admin" moduleCode={match.params.moduleName} />
                )}
              />
              <Route
                exact
                path="/admin/module/:moduleCode/quiz"
                render={({ match }) => (
                  <QuizPage type="admin" moduleCode={match.params.moduleCode} />
                )}
              />
              <Route
                exact
                path="/admin/edit"
                render={({ match }) => <EditPage type="admin" />}
              />
              <Route
                exact
                path="/admin/edit/editmodule/:_id"
                render={({ match }) => (
                  <CreateModule type="admin" _id={match.params._id} />
                )}
              />
              <Route
                exact
                path="/admin/edit/editmodule/quiz/:_id"
                render={({ match }) => (
                  <EditQuiz type="admin" _id={match.params._id} />
                )}
              />
              <Route
                exact
                strict
                path="/admin/quizresult/:moduleId"
                render={({ match }) => (
                  <QuizResult type="admin" moduleId={match.params.moduleId} />
                )}
              />
              <Route
                exact
                path="/admin/studentscore"
                render={({ match }) => <StudentScore type="admin" />}
              />{" "}
              <Route component={NoMatch} />
            </Switch>
          </AuthComponent>
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            strict
            path="/"
            render={() => <Login loginSuccess={this.LoginSuccess} />}
          />
          <Route
            exact
            path="/changepassword"
            render={() => <ChangePassword />}
          />
          <Route
            exact
            path="/forgetpassword"
            render={() => <ForgetPassword />}
          />
          <Route exact path="/register" render={() => <Register />} />
          <Route exact path="/home" render={() => <Home type="guest" />} />
          <Route
            exact
            path="/module/:moduleName"
            render={({ match }) => (
              <Module type="guest" moduleCode={match.params.moduleName} />
            )}
          />
          <Route
            exact
            path="/module/:moduleCode/quiz"
            render={({ match }) => (
              <QuizPage type="guest" moduleCode={match.params.moduleCode} />
            )}
          />
          <Route
            exact
            strict
            path="/quizresult/:moduleId"
            render={({ match }) => (
              <QuizResult type="guest" moduleId={match.params.moduleId} />
            )}
          />
          {this.getRoutes()}
          <Route component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}
// function loadModule({ match }) {
//   return <Module moduleName={match.params.moduleName} />;
// }
export default App;
