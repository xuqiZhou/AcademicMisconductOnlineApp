import React, { Component } from "react";
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
    this.state = {
      email: "",
      oldPassword: "",
      password: "",
      confPassword: "",
      invalid: false,
      strongPassword: true
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

  reset() {}

  render() {
    return (
      <React.Fragment>
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
                    value={localStorage.getItem("userEmail")}
                    invalid={this.state.emailInvalid}
                    onChange={e => {
                      this.setState({ email: e.target.value });
                    }}
                  />
                  <FormFeedback>
                    {this.state.webmail
                      ? "The email address you have entered is already registered."
                      : "Please use your Webmail address"}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label>Please Enter Your Old Password </Label>
                  <Input
                    placeholder="Old Password"
                    type="password"
                    onChange={e => {
                      this.setState({ oldPassword: md5(e.target.value) });
                    }}
                  />
                  <FormFeedback />
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
