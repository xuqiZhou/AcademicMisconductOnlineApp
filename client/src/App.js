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
import Login from "./components/Login";
import AuthComponent from "./components/AuthComponent";

class App extends Component {
  state = {};

  render() {
    return (
      <Router>
        <div>
          <Route exact strict path="/" render={() => <Login />} />
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
          {/* student routes */}
          <AuthComponent>
            <Route
              exact
              strict
              path="/student/home"
              render={() => <Home type="student" />}
            />
          </AuthComponent>
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
              <QuizPage type="student" moduleCode={match.params.moduleCode} />
            )}
          />
          {/* admin routes */}
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
            path="/admin/studentscore"
            render={({ match }) => <StudentScore type="admin" />}
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

// class Application extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {};
//   }

//   componentDidMount() {
//     const messages = client.service('messages');
//     const users = client.service('users');

//     // Try to authenticate with the JWT stored in localStorage
//     client.authenticate().catch(() => this.setState({ login: null }));

//     // On successfull login
//     client.on('authenticated', login => {
//       // Get all users and messages
//       Promise.all([
//         messages.find({
//           query: {
//             $sort: { createdAt: -1 },
//             $limit: 25
//           }
//         }),
//         users.find()
//       ]).then( ([ messagePage, userPage ]) => {
//         // We want the latest messages but in the reversed order
//         const messages = messagePage.data.reverse();
//         const users = userPage.data;

//         // Once both return, update the state
//         this.setState({ login, messages, users });
//       });
//     });
// client.on('logout', () => this.setState({
//   login: null,
//   messages: null,
//   users: null
// }));
// const socket = io('http://192.168.1.4:3030');
// const client = feathers();

// client.configure(feathers.socketio(socket));
// client.configure(feathers.authentication({
//   storage: window.localStorage
// }));

// export default client;
