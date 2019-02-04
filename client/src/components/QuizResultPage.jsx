import React, { Component } from "react";
import { Card, CardBody, Container } from "reactstrap";
import { Link } from "react-router-dom";
import Navbar from "./MyNavbar";
import Footer from "./Footer";
import axios from "axios";
import uuid from "uuid";
import md5 from "md5";

class QuizPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      keys: [],
      dataFetched: false,
      precentage: 0,
      studentAnswer: JSON.parse(localStorage.getItem("studentAnswer"))
    };
  }

  componentDidMount() {
    axios.get(`/module/quiz/${this.props.moduleId}`).then(res => {
      this.setState({ questions: res.data });
      let answers = [];
      res.data.forEach(question => {
        answers.push(md5(question.options[0]));
      });
      this.setState({ dataFetched: true, keys: answers });
      const totalQuestion = this.state.keys.length;
      let score = 0;
      const studentAnswer = this.state.studentAnswer;
      studentAnswer.forEach(answer => {
        if (this.state.keys.indexOf(md5(answer)) !== -1) score++;
      });
      const precentage = Math.round((score / totalQuestion) * 100 * 100) / 100;
      this.setState({ precentage });
    });
  }

  getQuestions() {
    return this.state.questions.map((question, index) => (
      <React.Fragment key={uuid()}>
        <Card className="text-dark bg-light">
          <CardBody className="card-body m-md-2 m-lg-4">
            {index + 1}.
            <p className="h4 mx-md-5">
              {question.question}
              <br />
            </p>
            <div className="mx-lg-5">
              <div className="mx-5">{this.getOptions(question, index)}</div>
            </div>
          </CardBody>
        </Card>
        <hr className="my-5" style={{ width: "100%" }} />
      </React.Fragment>
    ));
  }

  getOptions(question, index) {
    let source = [];
    let output = [];
    for (let prop in question.options) {
      if (question.options.hasOwnProperty(prop)) {
        source[prop] = question.options[prop];
      }
    }
    for (let i = source.length - 1; i >= 0; i--) {
      output.push(source.splice(Math.floor(Math.random() * source.length), 1));
    }
    return output.map((option, index) => (
      <p key={uuid()} className={this.getClassName(option)}>
        {`${String.fromCharCode(index + 65)}. ${option}`}
      </p>
    ));
  }

  getClassName(option) {
    let cls = "my-3 form-check-label ";
    if (this.state.keys.indexOf(md5(option[0])) !== -1) cls += "text-success ";
    else if (this.state.studentAnswer.indexOf(option[0]) !== -1)
      cls += "text-danger ";
    return cls;
  }

  render() {
    return (
      <React.Fragment>
        <Navbar role={this.props.type} page="quiz" />
        <Container>
          <h1 className="m-5">{`You Scored: ${this.state.precentage}%`}</h1>
          <hr className="my-5" style={{ width: "100%" }} />
          {this.getQuestions()}
        </Container>

        <div
          hidden={this.state.precentage === 100}
          className="m-5 h2 text-center"
        >
          Sorry, you have to get 100% to progress, click{" "}
          <Link
            to={
              this.props.type === "guest"
                ? "/home"
                : this.props.type === "student"
                ? "/student/home"
                : "/admin/home"
            }
            className="font-weight-bold"
          >
            HERE
          </Link>{" "}
          to Homepage
        </div>

        <div
          hidden={this.state.precentage !== 100}
          className="m-5 h2 text-center"
        >
          Congratulations! Click{" "}
          <Link
            to={
              this.props.type === "guest"
                ? "/home"
                : this.props.type === "student"
                ? "/student/home"
                : "/admin/home"
            }
            className="font-weight-bold"
          >
            HERE
          </Link>{" "}
          for homepage.
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}
export default QuizPage;
