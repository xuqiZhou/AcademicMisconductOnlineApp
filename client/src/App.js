// /* jshint ignore:start */
import React, { Component } from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";

import Route from "react-router-dom/Route";
// App Components
// import Home from "./components/Home";
// import Module from "./components/Module";
// import QuizPage from "./components/QuizPage";
// import EditPage from "./components/EditPage";
// import CreateModule from "./components/CreateModule";
import DropdownButton from "./components/DropdownButton";

import "./App.css";

class App extends Component {
  state = {
    // userStatus: "guest",
    // role: "student"
  };
  render() {
    return (
      <Router>
        <div>
          <DropdownButton />
        </div>
      </Router>
    );
  }
}
//   render() {
//     return (
//       <Router>
//         <div>
//           <Route exact path="/home" render={() => <Home role="guest" />} />
//           <Route
//             exact
//             path="/module/:moduleName"
//             render={({ match }) => (
//               <Module role="guest" moduleName={match.params.moduleName} />
//             )}
//           />
//           <Route
//             path="/module/:moduleName/quiz"
//             render={({ match }) => (
//               <QuizPage role="guest" moduleName={match.params.moduleName} />
//             )}
//           />
//           {/* student routes */}
//           <Route
//             exact
//             path="/student/home"
//             render={() => <Home role="student" />}
//           />
//           <Route
//             exact
//             path="/student/module/:moduleName"
//             render={({ match }) => (
//               <Module role="student" moduleName={match.params.moduleName} />
//             )}
//           />
//           <Route
//             path="/student/module/:moduleName/quiz"
//             render={({ match }) => (
//               <QuizPage role="student" moduleName={match.params.moduleName} />
//             )}
//           />
//           {/* admin routes */}
//           <Route
//             exact
//             path="/admin/home"
//             render={() => <Home role="admin" />}
//           />
//           <Route
//             exact
//             path="/admin/module/:moduleName"
//             render={({ match }) => (
//               <Module role="admin" moduleName={match.params.moduleName} />
//             )}
//           />
//           <Route
//             path="/admin/module/:moduleName/quiz"
//             render={({ match }) => (
//               <QuizPage role="admin" moduleName={match.params.moduleName} />
//             )}
//           />
//           <Route
//             exact
//             path="/admin/edit"
//             render={({ match }) => <EditPage role="admin" />}
//           />
//           <Route
//             path="/admin/edit/createmodule"
//             render={({ match }) => <CreateModule role="admin" />}
//           />
//           <Route
//             path="/admin/edit/editmodule/:moduleName"
//             render={({ match }) => (
//               <CreateModule role="admin" moduleName={match.params.moduleName} />
//             )}
//           />
//           <Route
//             esact
//             strict
//             path="/admin/edit/handlesubmit/:moduleId"
//             render={({ match }) => (
//               <Redirect to={`/admin/home/${match.params.moduleID}`} />
//             )}
//           />
//         </div>
//       </Router>
//     );
//   }
// }

// function loadModule({ match }) {
//   return <Module moduleName={match.params.moduleName} />;
// }
export default App;
