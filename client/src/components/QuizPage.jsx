/* jshint ignore: start */
import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Button } from "reactstrap";
import { Card, CardBody, Container } from "reactstrap";
// Data
// import Questions from "../data/questions.json";

import Navbar from "./MyNavbar";
import Footer from "./Footer";

class QuizPage extends Component {
  constructor() {
    super();
    this.state = {
      userStatus: "guest",
      moduleName: null,
      questions: []
      // moduleCode: "introduction",
      // userAnswer: {} //for guest user????????
    };
  }

  componentDidMount() {
    fetch("/question")
      .then(res => res.json())
      .then(questions =>
        this.setState(
          { questions, moduleName: questions[0].moduleName },
          () => {
            console.log(questions);
            console.log(questions[0].moduleName);
          }
        )
      );
  }

  render() {
    return (
      <React.Fragment>
        <Navbar
          role={this.props.role}
          page="quiz"
          userStatus={this.state.userStatus}
        />
        <Container>
          <h1 className="text-center m-5 p-5">{this.state.moduleName}</h1>
          <form>
            {this.getQuestions()}
            <div className="m-5">
              <Link to="" className="btn btn-danger col mt-3">
                Submit
              </Link>
            </div>
          </form>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }

  getQuestions() {
    return this.state.questions.map(question => (
      <React.Fragment>
        <Card key={question.qId} className="text-dark bg-light">
          <CardBody className="card-body m-md-2 m-lg-4">
            {question.qId}.
            <p className="mx-md-5">
              {question.question}
              <br />
            </p>
            <div className="mx-lg-5">
              <div className="mx-5">{this.getOptions(question)}</div>
            </div>
          </CardBody>
        </Card>
        <hr className="my-5" style={{ width: "100%" }} />
      </React.Fragment>
    ));
  }

  module() {
    return this.state.modules.map(module => (
      <React.Fragment key={module.moduleName}>
        <div className="text-center col-12 col-md-6 p-3">
          <div style={{ height: "13rem" }} className="text-center bg-dark py-3">
            <Link
              name="top"
              to={module.moduleHref}
              className={this.getBadgeClasses(module)}
              style={{
                color: "inherit",
                textDecoration: "none",
                opacity: 1,
                display: "block",
                width: "100%",
                height: "auto",
                transition: "0.5s ease",
                backfaceVisibility: "hidden"
              }}
            >
              {module.moduleName}
            </Link>
          </div>
        </div>
        <hr className="d-block d-sm-none" style={{ width: "80%" }} />
      </React.Fragment>
    ));
  }

  // Scramble the options
  getOptions(question) {
    let optionArray = question.options;
    let orderedArray = [];
    for (let i = optionArray.length - 1; i >= 0; i--) {
      let index = Math.floor(Math.random() * optionArray.length);
      orderedArray.push(optionArray.splice(index, 1)[0]);
    }
    return orderedArray.map(option => (
      <div className="form-check" key={option.description}>
        <input
          className="form-check-input"
          type="radio"
          name="exampleRadios"
          id={option.cId}
          value={option.description}
        />
        <label
          className="form-check-label mx-5"
          // for={answer.option}
        >
          {option.description}
        </label>
      </div>
    ));
  }
}
export default QuizPage;
