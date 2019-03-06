import React, { Component } from "react";
import { Container, Button } from "reactstrap";
import { Label, Input, FormGroup, FormFeedback } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import md5 from "md5";
import axios from "axios";
import UWImage from "../UW_left-stack_white.png";

class EntryPage extends Component {
  constructor() {
    super();
    this.onLogin = this.onLogin.bind(this);
    this.keyPressLogin = this.keyPressLogin.bind(this);
    this.state = {
      email: "",
      password: "",
      role: "",
      redirect: false,
      invalidEmail: false,
      invalidPassword: false,
      emailErrMessage: "",
      passErrMessage: ""
    };
  }

  onLogin(e) {
    e.preventDefault();
    axios
      .post("/getToken", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        if (res.data.success === true) {
          localStorage.setItem("cool-jwt", res.data.token);
          localStorage.setItem("role", res.data.type);
          localStorage.setItem("userEmail", res.data.email);
          this.props.loginSuccess();
          this.setState({ role: res.data.type, redirect: true });
        } else {
          if (res.data.errMessage === "User Not Exist") {
            this.setState({
              emailErrMessage: res.data.errMessage,
              invalidEmail: true,
              invalidPassword: false
            });
          }
          if (res.data.errMessage === "Password Not Correct")
            this.setState({
              passErrMessage: res.data.errMessage,
              invalidPassword: true,
              invalidEmail: false
            });
        }
      })
      .catch(() =>
        this.setState({
          error: true
        })
      );
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      if (this.state.role === "admin") return <Redirect to={"/admin/home"} />;
      else return <Redirect to={"/student/home"} />;
    }
  };

  keyPressLogin(e) {
    if (e.key === "Enter") this.onLogin(e);
  }

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
          onKeyPress={this.keyPressLogin}
          className="text-center"
          style={{ marginTop: "18rem" }}
        >
          <h1>Login</h1>
          <div className="row">
            <div className="col-none col-md-3" />
            <div className="col col-md-6">
              <form className="text-left mb-4">
                <FormGroup>
                  <Label>Enter Webmail Address</Label>
                  <Input
                    placeholder="username@webmail.uwinnipeg.ca"
                    type="email"
                    invalid={this.state.invalidEmail === true}
                    onChange={e => {
                      this.setState({ email: e.target.value });
                    }}
                  />
                  <FormFeedback>{this.state.emailErrMessage}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    invalid={this.state.invalidPassword === true}
                    placeholder="Enter your Password"
                    type="password"
                    onChange={e => {
                      this.setState({ password: md5(e.target.value) });
                    }}
                  />
                  <FormFeedback>{this.state.passErrMessage}</FormFeedback>
                </FormGroup>
                <Button
                  onClick={this.onLogin}
                  className="mt-5 text-white"
                  color="dark"
                  block
                >
                  Login
                </Button>
              </form>
              <Button className="mb-5" type="submit" color="dark" block>
                <Link
                  style={{ textDecoration: "none" }}
                  className="text-white"
                  to="/home"
                >
                  Continue Without Login
                </Link>
              </Button>
              <Link
                className="text-dark"
                style={{ textDecoration: "none" }}
                to="/register"
              >
                Register
              </Link>{" "}
              -&nbsp;
              <Link
                className="text-dark"
                style={{ textDecoration: "none" }}
                to="/forgetpassword"
              >
                Forget Password
              </Link>
            </div>
            <div className="col-none col-md-3" />
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default EntryPage;
