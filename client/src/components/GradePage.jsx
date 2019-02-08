import React, { Component } from "react";
import { Container, Table } from "reactstrap";
import uuid from "uuid";
import Navbar from "./MyNavbar";
import Footer from "./Footer";

class Grade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentInfo: [],
      moduleInfo: [],
      headerLength: 0
    };
  }

  componentDidMount() {
    fetch(`/studentinfo/${this.props.userId}`)
      .then(res => res.json())
      .then(info => {
        let moduleCode = [];
        info.modules.forEach(module => {
          moduleCode.push(module.moduleCode);
        });
        this.setState({ studentInfo: info.student, moduleInfo: moduleCode });
      });
  }

  getContent(moduleCode) {
    const answers = this.state.studentInfo.answer;
    let scoreArray = [];
    const ansForMod = answers.filter(answer => answer.module === moduleCode);
    ansForMod.sort(function(a, b) {
      return a.date - b.date;
    });
    for (let i = 0; i < this.state.headerLength; i++) {
      if (ansForMod[i] !== undefined) scoreArray.push(ansForMod[i].score + "%");
      else scoreArray.push(" ");
    }
    return scoreArray.map(score => (
      <React.Fragment key={uuid()}>
        <td className={"text-center"}>{score}</td>
      </React.Fragment>
    ));
  }

  getHeaders() {
    for (let a = 0; a < this.state.moduleInfo.length; a++) {
      const ansForMod = this.state.studentInfo.answer.filter(
        answer => answer.module === this.state.moduleInfo[a]
      );
      if (ansForMod.length > this.state.headerLength)
        this.setState({ headerLength: ansForMod.length });
    }
    let header = [];
    for (let i = 0; i < this.state.headerLength; i++) {
      header.push(`Trail ${i + 1}`);
    }
    return header.map(header => (
      <th key={uuid()} className="text-center">
        {header}
      </th>
    ));
  }

  getDateTime(date) {
    if (date === undefined) return " ";
    else
      return `${new Date(date).toDateString()} ${new Date(
        date
      ).toLocaleTimeString()}`;
  }

  render() {
    return (
      <React.Fragment>
        <Navbar role={this.props.type} />
        <Container style={{ minHeight: "800px" }}>
          <h2 className="text-center my-5 py-5">My Grades</h2>
          <div className="my-3">
            <h4>Account: {this.state.studentInfo.email}</h4>
            <h4>
              Last Submited at :
              {this.getDateTime(this.state.studentInfo.lastSubmitedDate)}
            </h4>
          </div>
          <Table className="my-5" responsive striped hover>
            <thead>
              <tr>
                <th>Module</th>
                {this.getHeaders()}
              </tr>
            </thead>
            <tbody>
              {this.state.moduleInfo.map(module => (
                <React.Fragment key={uuid()}>
                  <tr>
                    <th scope="row">{module}</th>
                    {this.getContent(module)}
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Grade;
