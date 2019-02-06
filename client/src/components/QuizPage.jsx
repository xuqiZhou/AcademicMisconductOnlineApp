import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Card, CardBody, Container, Button } from "reactstrap";
import uuid from "uuid";
import axios from "axios";
import md5 from "md5";
import Navbar from "./MyNavbar";
import Footer from "./Footer";

class QuizPage extends Component {
  constructor(props) {
    super(props);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      questions: [],
      moduleFetched: false,
      questionNotFetched: true,
      moduleId: "",
      moduleTitle: "",
      answers: [],
      redirect: false,
      correctAnswer: []
    };
  }

  componentDidMount() {
    fetch(`/module/${this.props.moduleCode}`)
      .then(res => res.json())
      .then(module =>
        this.setState({
          moduleId: module._id,
          moduleTitle: module.title,
          moduleFetched: true
        })
      );
  }

  fetchQuestion() {
    if (this.state.moduleFetched && this.state.questionNotFetched) {
      axios.get(`/module/quiz/${this.state.moduleId}`).then(res => {
        res.data.forEach(question => {
          // CORRECTANSWERS.push(question.options[0]);
          this.state.correctAnswer.push(md5(question.options[0]));
        });
        const questions = res.data;
        for (let i = 0; i < questions.length; i++) {
          let optionArray = questions[i].options;
          let orderedArray = [];
          for (let i = optionArray.length - 1; i >= 0; i--) {
            let index = Math.floor(Math.random() * optionArray.length);
            orderedArray.push(optionArray.splice(index, 1)[0]);
          }
          questions[i].options = orderedArray;
        }
        this.setState({ questions: questions, questionNotFetched: false });
      });
    }
  }

  getQuestions() {
    return this.state.questions.map((question, index) => (
      <React.Fragment key={uuid()}>
        <Card className="text-dark bg-light">
          <CardBody className="card-body m-md-2 m-lg-4">
            {index + 1}.
            <p className="h4 mx-md-5 md-3">
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
    let orderedArray = question.options;
    return orderedArray.map(option => (
      <div className="form-check my-3" key={uuid()}>
        <input
          className="form-check-input"
          type="radio"
          name={question.question}
          value={JSON.stringify({ index, option })}
          onChange={this.handleOptionChange}
          checked={this.state.answers.indexOf(option) !== -1}
        />
        <label className="form-check-label mx-5">{option}</label>
      </div>
    ));
  }

  handleOptionChange(e) {
    const value = JSON.parse(e.target.value);
    let target = this.state.answers;
    target[value.index] = value.option;
    this.setState({ answers: target });
  }

  onSubmit(e) {
    e.preventDefault();
    const lastSubmitedDate = Date.now();
    let score = 0;
    const answers = this.state.answers;
    answers.forEach(answer => {
      if (this.state.correctAnswer.indexOf(md5(answer)) !== -1) score++;
    });
    if (localStorage.getItem("userEmail")) {
      // console.log(Math.round((score / this.state.correctAnswer.length) * 100 * 100) / 100);
      const newInfo = {
        moduleCode: this.props.moduleCode,
        email: localStorage.getItem("userEmail"),
        score:
          Math.round((score / this.state.correctAnswer.length) * 100 * 100) /
          100,
        lastSubmitedDate
      };
      axios.post("/manageScore", newInfo).then(res => console.log(res.data));
    }
    localStorage.setItem("studentAnswer", JSON.stringify(answers));
    this.setState({ redirect: true });
    // axios.post("/handlequiz");
  }

  renderRedirect = () => {
    const moduleId = this.state.moduleId;
    if (this.state.redirect) {
      if (this.props.type === "admin")
        return <Redirect to={`/admin/quizresult/${moduleId}`} />;
      if (this.props.type === "student")
        return <Redirect to={`/student/quizresult/${moduleId}`} />;
      if (this.props.type === "guest")
        return <Redirect to={`/quizresult/${moduleId}`} />;
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.renderRedirect()}
        {this.fetchQuestion()}
        <Navbar role={this.props.type} page="quiz" />
        <Container>
          <h1 className="text-center m-5 p-5">{this.state.moduleTitle}</h1>
          <form onSubmit={this.onSubmit}>
            {this.getQuestions()}
            <div className="m-5">
              <Button type="submit" className="btn btn-danger col mt-3">
                Submit
              </Button>
            </div>
          </form>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}
export default QuizPage;
