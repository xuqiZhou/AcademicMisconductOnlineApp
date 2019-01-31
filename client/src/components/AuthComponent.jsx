import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { getJwt } from "../helpers/jwt";

class AuthComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
  }

  componentDidMount() {
    this.getUser();
    console.log(localStorage.getItem("role"));
  }

  getUser() {
    const jwt = getJwt();
    console.log(jwt);
    if (!jwt) {
      this.setState({
        user: null
      });
      return;
    }

    axios
      .get("/getAuth", {
        headers: { Authorization: getJwt(), role: this.props.userType }
      })
      .then(res => {
        this.setState({
          user: res.data
        });
      });
  }

  render() {
    const { user } = this.state;
    if (user === undefined) {
      // return <div>Not Authorizated</div>;
      return <div />;
    }

    if (user === null) {
      this.props.history.push("/login");
    }

    return this.props.children;
  }
}

export default withRouter(AuthComponent);