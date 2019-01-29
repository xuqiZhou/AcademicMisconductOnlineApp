import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import md5 from "md5";
import axios from "axios";
import {
  Container,
  Button,
  Label,
  Input,
  FormFeedback,
  FormGroup
} from "reactstrap";

import UWImage from "../UW_left-stack_white.png";

class Register extends Component {
  constructor() {
    super();
    this.validatePassword = this.validatePassword.bind(this);
    this.register = this.register.bind(this);
    this.state = {
      email: "",
      password: "",
      confPassword: "",
      invalid: false,
      emailInvalid: false,
      redirect: false,
      registerSucceed: false
    };
  }

  validatePassword(e) {
    let input = e.target.value;
    if (md5(input) !== this.state.password) {
      this.setState({ invalid: true });
    } else this.setState({ invalid: false });
  }

  register(e) {
    e.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password
    };
    axios.post("/handleregister", newUser).then(res => {
      console.log("res.data");
      if (res.data.success === true) {
        setTimeout(() => {
          this.setState({ redirect: true });
        }, 1000);
        this.setState({ registerSucceed: true });
      } else {
        this.setState({ emailInvalid: true });
      }
    });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={"/student/home"} />;
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
        <Container
          hidden={!this.state.registerSucceed}
          className="text-center"
          style={{ marginTop: "20rem" }}
        >
          <div className="display-1 font-weight-bold">Register Succeed!</div>
          <div className="h1 my-5 py-5"> Redirecting to Homepage</div>
        </Container>
        <Container
          hidden={this.state.registerSucceed}
          className="text-center"
          style={{ marginTop: "20rem" }}
        >
          <div className="row">
            <div className="col-none col-md-3" />
            <div className="col col-md-6">
              <form className="text-left mb-4">
                <FormGroup>
                  <Label>Enter Your Webmail Address</Label>
                  <Input
                    placeholder="Enter your Password"
                    type="email"
                    invalid={this.state.emailInvalid}
                    onChange={e => {
                      this.setState({ email: e.target.value });
                    }}
                  />
                  <FormFeedback>
                    The email address you have entered is already registered.
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    placeholder="Enter your Password"
                    type="password"
                    onChange={e => {
                      this.setState({ password: md5(e.target.value) });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Confirm Password</Label>
                  <Input
                    placeholder="Confirm your Password"
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
                  onClick={this.register}
                >
                  Register
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

export default Register;
