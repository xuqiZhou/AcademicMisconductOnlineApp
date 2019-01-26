import React, { Component } from "react";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import Navbar from "./MyNavbar";
import Footer from "./Footer";
import axios from "axios";

class EditQuizPage extends Component {
  constructor() {
    super();
    this.showQuestionPanel = this.showQuestionPanel.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.addOption = this.addOption.bind(this);
    this.reduceOption = this.reduceOption.bind(this);
    this.state = {
      questionPanelHide: false,
      quizQuestion: "",
      options: [""]
    };
  }
  showQuestionPanel() {
    this.setState({ questionPanelHide: false });
    console.log("Add Question...");
  }
  addQuestion(e) {
    e.preventDefault();
    const newQuestion = {
      moduleId: this.props._id,
      question: this.state.quizQuestion,
      options: this.state.options
    };
    axios
      .post("/admin/edit/editmodule/quiz/:_id", newQuestion)
      .then(res => console.log(res.data));
    this.setState({ options: [""], quizQuestion: "", questionPanelHide: true });
  }
  addOption() {
    const options = this.state.options;
    options.push("");
    this.setState(options);
  }
  reduceOption() {
    const options = this.state.options;
    options.pop();
    this.setState(options);
  }
  getOptionInputs() {
    return this.state.options.map((option, index) => (
      <React.Fragment key={index}>
        <Input
          className="my-2"
          onChange={e => {
            const options = this.state.options;
            options[index] = e.target.value;
            this.setState({ options });
          }}
        />
      </React.Fragment>
    ));
  }

  render() {
    return (
      <React.Fragment>
        <Navbar role={this.props.role} />
        <Container>
          <h2 className="text-center my-5 py-5">Hard Coded Module Name</h2>
          <Form hidden={this.state.questionPanelHide}>
            <FormGroup>
              <Label>Question</Label>
              <Input
                style={{ minHeight: "100px" }}
                type="textarea"
                name="text"
                onChange={e => {
                  this.setState({ quizQuestion: e.target.value });
                }}
              />
            </FormGroup>
            <div className="my-3  text-right">
              <div className="btn-group" role="group" aria-label="...">
                <Button
                  color="dark"
                  className="text-white"
                  onClick={this.addOption}
                >
                  +
                </Button>
                <Button
                  color="secondary"
                  className="text-white"
                  onClick={this.reduceOption}
                >
                  -
                </Button>
              </div>
            </div>
            {this.getOptionInputs()}
            <div className="row py-5">
              <div className="col-md" />
              <Button
                color="danger"
                size="lg"
                onClick={this.addQuestion}
                className="text-white"
              >
                ADD
              </Button>
              <div className="col-md" />
            </div>
          </Form>
          {/* <div>Question panel</div> */}
          <div hidden={!this.state.questionPanelHide} className="row py-5">
            <div className="col-md" />
            <Button
              size="lg"
              onClick={this.showQuestionPanel}
              className="text-white"
            >
              ADD QUESTION
            </Button>
            <div className="col-md" />
          </div>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

export default EditQuizPage;
