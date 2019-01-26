import React, { Component } from "react";
import { Button } from "reactstrap";
class QuizQuestions extends Component {
  state = {};
  render() {
    const q = this.props.question;
    return (
      <React.Fragment>
        <div className="card-body m-md-2 m-lg-4">
          <p className="mx-md-5">{q.question}</p>
          <div className="mx-5">
            <div className="mx-3">
              {q.options.map(option => (
                <p className="form-check-label">{option}</p>
              ))}
            </div>
          </div>
          <div className="text-right">
            <Button className="btn btn-danger">Edit</Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default QuizQuestions;
