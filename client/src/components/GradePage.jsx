import React, { Component } from "react";
import { Container, Table } from "reactstrap";
import uuid from "uuid";
import Navbar from "./MyNavbar";
import Footer from "./Footer";
import Certificate from "./Certificate";

class Grade extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false,
      studentInfo: [],
      moduleInfo: [],
      headerLength: 0,
      passedModule: []
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  componentDidMount() {
    fetch(`/studentinfo/${this.props.userId}`)
      .then(res => res.json())
      .then(info => {
        let moduleInfo = [];
        let passedModule = [];
        info.modules.forEach(module => {
          moduleInfo.push({
            moduleCode: module.moduleCode,
            moduleId: module._id
          });
        });
        console.log(info.student);

        this.setState({ studentInfo: info.student, moduleInfo, passedModule });
      });
  }

  getHeaders() {
    for (let a = 0; a < this.state.moduleInfo.length; a++) {
      const ansForMod = this.state.studentInfo.answer.filter(
        answer => answer.moduleId === this.state.moduleInfo[a].moduleId
      );
      if (ansForMod.length > this.state.headerLength)
        this.setState({ headerLength: ansForMod.length });
    }
    let header = [];
    for (let i = 0; i < this.state.headerLength; i++) {
      header.push(`Trial ${i + 1}`);
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

  getCertificate() {
    if (this.state.studentInfo.allPassed === true) {
      return (
        <Certificate
          studentInfo={this.state.studentInfo}
          _id={this.state.studentInfo._id}
        />
      );
    }
    // let passedCount = 0;
    // for (let i = 0; i < this.state.passedModule.length; i++) {
    //   if (this.state.passedModule[i] === true) passedCount++;
    // }
    // if (passedCount !== 0 && passedCount === this.state.moduleInfo.length) {
    //   return (
    //     <Certificate
    //       studentInfo={this.state.studentInfo}
    //       _id={this.state.studentInfo._id}
    //     />
    //   );
    // }
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
              {this.state.moduleInfo.map((module, index) => (
                <React.Fragment key={uuid()}>
                  <tr>
                    <th scope="row">{module.moduleCode}</th>
                    {this.getContent(module, index)}
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </Table>
          {this.getCertificate()}
        </Container>
        <Footer />
      </React.Fragment>
    );
  }

  getContent(module, index) {
    const moduleId = module.moduleId;
    const answers = this.state.studentInfo.answer;
    let scoreArray = [];
    const ansForMod = answers.filter(answer => answer.moduleId === moduleId);
    ansForMod.sort(function(a, b) {
      return a.date - b.date;
    });
    for (let i = 0; i < this.state.headerLength; i++) {
      if (ansForMod[i] !== undefined) {
        const passedModule = this.state.passedModule;
        if (ansForMod[i].score === 100 || passedModule[index] === true) {
          passedModule[index] = true;
        } else passedModule[index] = false;
        scoreArray.push(ansForMod[i].score + "%");
      } else scoreArray.push(" ");
    }
    return scoreArray.map(score => (
      <React.Fragment key={uuid()}>
        <td className="text-center">{score}</td>
        {/* <MyTooltip /> */}
      </React.Fragment>
    ));
  }
}

export default Grade;
