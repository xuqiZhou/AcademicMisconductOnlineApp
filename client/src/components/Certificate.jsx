import React, { Component } from "react";
import { Container, Button, Input } from "reactstrap";
import axios from "axios";

class Certificate extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      name: "",
      loading: false,
      hideInput: this.props.studentInfo.certificate ? true : false,
      data: this.props.studentInfo.certificate
        ? this.props.studentInfo.certificate
        : null
    };
  }

  onClick(e) {
    e.preventDefault();
    this.setState({ loading: true });
    axios
      .post("/handlecertificate", {
        name: this.state.name,
        _id: this.props._id
      })
      .then(res => {
        this.setState({ data: res.data, hideInput: true });
      });
  }

  image() {
    if (this.state.data === null) {
      if (this.state.loading === true) return <div>Loading</div>;
      else return null;
    } else {
      return (
        <img
          alt="Certificate"
          className="my-5 by-5 border border-dark"
          style={{ maxWidth: "100%" }}
          src={this.state.data}
        />
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <div style={{ paddingTop: "100px" }} className="text-center">
            <Input
              hidden={this.state.hideInput}
              style={{ maxWidth: "300px", margin: "auto" }}
              className="my-5"
              type="text"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              placeholder="Enter Your Name for Certificate"
            />
            <div className="dark">
              <Button
                hidden={this.state.hideInput}
                className="my-5"
                color="dark"
                onClick={this.onClick}
              >
                Download My Certificate
              </Button>
            </div>{" "}
            <div>{this.image()}</div>
            <Button
              style={{
                color: "inherit",
                textDecoration: "none"
              }}
              className="mb-5 btn-lg text-white"
              color="dark"
              hidden={!this.state.hideInput}
            >
              <a
                style={{
                  color: "inherit",
                  textDecoration: "none"
                }}
                href={this.state.data}
                download="AMOA Certificate.jpg"
              >
                Download
              </a>
            </Button>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default Certificate;
