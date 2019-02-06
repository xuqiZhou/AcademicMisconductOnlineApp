import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import md5 from "md5";
import {
  Container,
  Button,
  Label,
  Input,
  FormFeedback,
  FormGroup
} from "reactstrap";

import UWImage from "../UW_left-stack_white.png";

class ForgetPassword extends Component {
  constructor() {
    super();
    this.validatePassword = this.validatePassword.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {
      email: localStorage.getItem("userEmail"),
      oldPassword: "",
      password: "",
      invalid: false,
      strongPassword: true,
      wrongPassword: false,
      userNotExist: false,
      errMessage: "",
      redirect: false
    };
  }

  checkPassword(e) {
    let password = e.target.value;
    if (
      new RegExp(/[0-9]/).test(password) &&
      new RegExp(/[a-z]/).test(password) &&
      new RegExp(/[A-Z]/).test(password) &&
      password.length >= 8
    ) {
      this.setState({ password: md5(e.target.value), strongPassword: true });
    } else {
      this.setState({ strongPassword: false });
    }
  }

  validatePassword(e) {
    let input = e.target.value;
    if (md5(input) !== this.state.password) {
      this.setState({ invalid: true });
    } else this.setState({ invalid: false });
  }

  reset(e) {
    e.preventDefault();
    const data = {
      email: this.state.email,
      oldPassword: this.state.oldPassword,
      newPassword: this.state.password,
      errMessage: ""
    };
    axios.post("/changepassword", data).then(res => {
      if (res.data.success === false) {
        const errMessage = res.data.errMessage;
        if (errMessage === "Wrong Password")
          this.setState({ errMessage, wrongPassword: true });
        else if (errMessage === "User Not Exist")
          this.setState({ errMessage, userNotExist: true });
      } else {
        this.setState({ redirect: true });
      }
    });
  }

  renderRedirect = () => {
    const role = localStorage.getItem("role");
    if (this.state.redirect) {
      if (role === "student") return <Redirect to={"/student/home"} />;
      else return <Redirect to={"/admin/home"} />;
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.renderRedirect()}
        <nav
          style={{ borderRadius: 0, position: "fixed !important" }}
          className="navbar navbar-expand-lg bg-dark mb-0"
        >
          <a className="nav-link" href="https://www.uwinnipeg.ca/">
            <img
              src={UWImage}
              style={{ width: "8rem" }}
              className="img-fluid"
              alt="UW logo"
            />
          </a>
        </nav>
        <Container className="text-center" style={{ marginTop: "24rem" }}>
          <div className="row">
            <div className="col-none col-md-3" />
            <div className="col col-md-6">
              <form className="text-left mb-4">
                <FormGroup>
                  <Label>Enter Webmail Address</Label>
                  <Input
                    placeholder="username@webmail.uwinnipeg.ca"
                    type="email"
                    value={this.state.email}
                    invalid={this.state.userNotExist === true}
                    onChange={e => {
                      this.setState({ email: e.target.value });
                    }}
                  />
                  <FormFeedback>{this.state.errMessage} </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label>Please Enter Your Old Password </Label>
                  <Input
                    placeholder="Old Password"
                    type="password"
                    invalid={this.state.wrongPassword === true}
                    onChange={e => {
                      this.setState({ oldPassword: md5(e.target.value) });
                    }}
                  />
                  <FormFeedback>{this.state.errMessage}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label>Please Enter Your New Password </Label>
                  <Input
                    placeholder="New Password"
                    type="password"
                    invalid={!this.state.strongPassword}
                    onChange={this.checkPassword}
                  />
                  <FormFeedback>
                    Password must be at least 8 characters including 1 uppercase
                    , 1 lowercase, and 1 numeric letter.
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label>Confrim New Password </Label>
                  <Input
                    placeholder="New Password"
                    type="password"
                    invalid={this.state.invalid}
                    onChange={this.validatePassword}
                  />
                  <FormFeedback>Passwords not match</FormFeedback>
                </FormGroup>
                <Button
                  className="my-5 text-white"
                  color="dark"
                  block
                  onClick={this.reset}
                >
                  Reset
                </Button>
              </form>
            </div>
            <div className="col-none col-md-3" />
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default ForgetPassword;
