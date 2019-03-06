import React, { Component } from "react";
import { Container, Table } from "reactstrap";
import uuid from "uuid";
import Navbar from "./MyNavbar";
import Footer from "./Footer";

class StudentScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentInfo: [],
      moduleInfo: [],
      moduleStuff: []
    };
  }
  componentDidMount() {
    fetch("/admin/edit/getinfo")
      .then(res => res.json())
      .then(info => {
        let moduleCode = [];
        let moduleId = [];
        let moduleInfo = [];
        info.modules.forEach(module => {
          moduleCode.push(module.moduleCode);
          moduleId.push(module._id);
          moduleInfo.push({
            moduleCode: module.moduleCode,
            moduleId: module._id
          });
        });
        this.setState({
          studentInfo: info.students,
          moduleInfo: moduleCode,
          moduleStuff: moduleInfo
        });
      });
  }

  getTableContent(student) {
    const answers = student.answer;
    console.log(student._id, student.allPassed);
    let checkmarkArray = [];
    const modules = this.state.moduleStuff;
    for (let i = 0; i < modules.length; i++) {
      const moduleId = modules[i].moduleId;
      const answerForThisModule = answers.filter(
        answer => answer.moduleId === moduleId
      );
      let latest = 0;
      let latestScore = null;
      for (let j = 0; j < answerForThisModule.length; j++) {
        if (answerForThisModule[j].date > latest)
          latestScore = answerForThisModule[j].score;
      }
      if (latestScore === 100) checkmarkArray.push(true);
      else if (latestScore === null) checkmarkArray.push(" ");
      else checkmarkArray.push(false);
    }
    return checkmarkArray.map(result => (
      <React.Fragment key={uuid()}>
        <td
          style={this.getBackgroundColor(student)}
          className={
            student.allPassed === true
              ? "text-success text-right"
              : result === true
              ? "text-success text-right"
              : "text-danger text-right"
          }
        >
          {student.allPassed === true ? (
            result === true ? (
              <span>&#10004;</span>
            ) : result === " " ? (
              " "
            ) : (
              <span>&#10004;</span>
            )
          ) : result === true ? (
            <span>&#10004;</span>
          ) : result === " " ? (
            " "
          ) : (
            <span>&#x2718;</span>
          )}
        </td>
      </React.Fragment>
    ));
  }

  getDateTime(date) {
    if (date === undefined) return " ";
    else
      return `${new Date(date).toDateString()} ${new Date(
        date
      ).toLocaleTimeString()}`;
  }

  getBackgroundColor(student) {
    return student.allPassed ? { background: "#FFEF7A" } : null;
  }

  render() {
    return (
      <React.Fragment>
        <Navbar role={this.props.type} />
        <Container style={{ minHeight: "700px" }}>
          <h2 className="text-center my-5 py-5">Student Score</h2>
          <div className="text-right my-5 font-weight-bold">
            <span className="text-success">&#10004;</span> Passed
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-danger">&#x2718;</span> Did not pass
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ background: "#FFEF7A" }} className="text-danger">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            &nbsp;&nbsp;Course completed
          </div>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th scope="col">Account</th>
                {this.state.moduleStuff.map(moduleInfo => (
                  <React.Fragment key={uuid()}>
                    <th className="text-right" scope="col">
                      {moduleInfo.moduleCode}
                    </th>
                  </React.Fragment>
                ))}
                <th className="text-right" scope="col">
                  Last Submited
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.studentInfo
                .sort(function(a, b) {
                  return (
                    new Date(b.lastSubmitedDate) - new Date(a.lastSubmitedDate)
                  );
                })
                .map(student => (
                  <React.Fragment key={student._id}>
                    <tr>
                      <th style={this.getBackgroundColor(student)} scope="row">
                        {student.email}
                      </th>
                      {this.getTableContent(student)}
                      <td
                        style={this.getBackgroundColor(student)}
                        className="text-right"
                      >
                        {this.getDateTime(student.lastSubmitedDate)}
                      </td>
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

export default StudentScore;
