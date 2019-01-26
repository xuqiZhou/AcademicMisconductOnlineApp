import React, { Component } from "react";
class Customers extends Component {
  constructor() {
    super();
    this.state = {
      questions: []
    };
  }

  componentDidMount() {
    fetch("/question")
      .then(res => res.json())
      .then(questions =>
        this.setState({ questions }, () => {
          console.log(questions);
        })
      );
  }

  render() {
    return (
      <div>
        <h2>Customers</h2>
      </div>
    );
  }
}

export default Customers;
