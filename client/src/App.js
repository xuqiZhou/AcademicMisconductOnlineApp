/* jshint ignore:start */
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Route from "react-router-dom/Route";
// App Components
import Home from "./components/Home";
import Module from "./components/Module";
import QuizPage from "./components/QuizPage";

class App extends Component {
  state = {
    userStatus: "guest",
    role: "student",
    question: null
  };

  componentDidMount() {
    this.getQuestion();
  }

  getQuestion = () => {
    fetch("http://localhost:5000/question")
      .then(response => response.json())
      .then(response => this.setState({ question: response.data }))
      .catch(err => console.error(err));
  };

  render() {
    return (
      <Router>
        <div>
          <div>{this.state.question}</div>
          <Route
            exact
            path="/"
            render={() => <Home role={this.state.role} />}
          />
          <Route
            exact
            path="/module/:moduleName"
            render={({ match }) => (
              <Module
                role={this.state.role}
                moduleName={match.params.moduleName}
              />
            )}
          />
          <Route
            path="/module/:moduleName/quiz"
            render={() => <QuizPage role={this.state.role} />}
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
