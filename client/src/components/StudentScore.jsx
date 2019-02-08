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
      moduleInfo: []
    };
  }
  componentDidMount() {
    fetch("/admin/edit/getinfo")
      .then(res => res.json())
      .then(info => {
        let moduleCode = [];
        info.modules.forEach(module => {
          moduleCode.push(module.moduleCode);
        });
        this.setState({ studentInfo: info.students, moduleInfo: moduleCode });
      });
  }

  getTableContent(student) {
    const answers = student.answer;
    let checkmarkArray = [];
    const modules = this.state.moduleInfo;
    for (let i = 0; i < modules.length; i++) {
      const moduleCode = modules[i];
      const answerForThisModule = answers.filter(
        answer => answer.module === moduleCode
      );
      let latest = 0;
      let latestScore = null;
      for (let j = 0; j < answerForThisModule.length; j++) {
        if (answerForThisModule[j].date > latest) {
          latestScore = answerForThisModule[j].score;
        }
      }
      if (latestScore === 100) checkmarkArray.push(true);
      else if (latestScore === null) checkmarkArray.push(" ");
      else checkmarkArray.push(false);
    }
    return checkmarkArray.map(result => (
      <React.Fragment key={uuid()}>
        <td
          className={
            result === true
              ? "text-success text-right"
              : "text-danger text-right"
          }
        >
          {result === true ? (
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

  render() {
    return (
      <React.Fragment>
        <Navbar role={this.props.type} />
        <Container style={{ minHeight: "700px" }}>
          <h2 className="text-center my-5 py-5">Student Score</h2>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th scope="col">Account</th>
                {this.state.moduleInfo.map(moduleCode => (
                  <React.Fragment key={uuid()}>
                    <th className="text-right" scope="col">
                      {moduleCode}
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
                      <th scope="row">{student.email}</th>
                      {this.getTableContent(student)}
                      <td className="text-right">
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
