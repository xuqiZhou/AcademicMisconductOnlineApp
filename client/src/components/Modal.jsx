/* jshint ignore: start */
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { getJwt } from "../helpers/jwt";
import axios from "axios";
import uuid from "uuid";

class MyModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.myGradeClicked = this.myGradeClicked.bind(this);
    this.state = {
      show: false,
      userStatus: this.props.userStatus,
      redirectToLogin: false,
      redirectToMyGrade: false,
      userId: null
    };
  }

  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ show: true });
  }

  handleLogout() {
    localStorage.removeItem("cool-jwt");
    localStorage.removeItem("role");
    localStorage.removeItem("studentAnswer");
    localStorage.removeItem("userEmail");
    this.setState({ redirectToLogin: true });
  }

  renderRedirectToLogin = () => {
    if (this.state.redirectToLogin) {
      return <Redirect to={"/"} />;
    }
  };
  renderRedirectToMyGrade = () => {
    if (this.state.redirectToMyGrade) {
      return <Redirect to={`/student/mygrades/${this.state.userId}`} />;
    }
  };

  myGradeClicked() {
    console.log("clicked");

    axios
      .get("/getAuth", {
        headers: {
          Authorization: `Bearer ${getJwt()}`,
          role: this.props.userStatus
        }
      })
      .then(res => {
        this.setState({
          userId: res.data.authData.user._id,
          redirectToMyGrade: true
        });
      });
  }

  render() {
    return (
      <div>
        {this.renderRedirectToLogin()}
        {this.renderRedirectToMyGrade()}
        <div
          className="text-white nav-link mr-3 ml-3"
          onClick={this.handleShow}
          style={{ cursor: "pointer" }}
        >
          {this.getModal(this.props.userStatus).type}
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title style={{ margin: "0 auto" }} className="row">
              {this.getModal(this.props.userStatus).title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            {this.getModal(this.props.userStatus).body.map(link => (
              <React.Fragment key={uuid()}>
                {link}
                <hr style={{ width: "70%" }} />
              </React.Fragment>
            ))}
            <div style={{ cursor: "pointer" }} onClick={this.handleLogout}>
              Log Out
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
  getModal(loginStatus) {
    //this will give different types of modal based on users' login statuses
    if (loginStatus.toUpperCase() === "ADMIN") {
      return {
        type: "Settings",
        title: "Settings",
        body: [
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/admin/studentscore"
          >
            Student Score
          </Link>,
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/changepassword"
          >
            Change Password
          </Link>
        ]
      };
    } else if (loginStatus.toUpperCase() === "STUDENT") {
      return {
        type: "Settings",
        title: "Student Settings",
        body: [
          <div style={{ cursor: "pointer" }} onClick={this.myGradeClicked}>
            My Grades
          </div>,
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/changepassword"
          >
            Change Password
          </Link>
        ]
      };
    }
  }
}

export default MyModal;
