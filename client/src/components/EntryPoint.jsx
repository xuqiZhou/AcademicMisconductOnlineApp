import React, { Component } from "react";
import { Container, Button } from "reactstrap";
import {
  FormGroup,
  ControlLabel,
  HelpBlock,
  FormControl
} from "react-bootstrap";
import { Link } from "react-router-dom";

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class EntryPage extends Component {
  state = {};
  render() {
    return (
      <Container className="text-center" style={{ marginTop: "20rem" }}>
        <h1>Login</h1>
        <div className="row">
          <div className="col-none col-md-3" />
          <div className="col col-md-6">
            <form className="text-left mb-4">
              <FieldGroup
                id="formControlsEmail"
                type="email"
                label="Email address"
                aria-describedby="emailHelp"
                placeholder="username@webmail.uwinnipeg.ca"
              />
              <FieldGroup
                id="formControlsPassword"
                label="Password"
                type="password"
                placeholder="Enter your Password"
              />
              <Button className="mt-5 text-white" color="dark" block>
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
              to="createaccount"
            >
              Forget Password
            </Link>
          </div>
          <div className="col-none col-md-3" />
        </div>
        <div>
          Links below will be removed after authentication has been implemented
        </div>
        <div className="text-center">
          <Link to="/home">Guest</Link>
          <br />
          <Link to="/student/home">Student</Link>
          <br />
          <Link to="/admin/home">Admin</Link>
          <br />
        </div>
      </Container>
    );
  }
}

export default EntryPage;
