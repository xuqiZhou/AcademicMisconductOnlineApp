import React, { Component } from "react";
import axios from "axios";
import { withRouter, Redirect } from "react-router-dom";
import { getJwt } from "../helpers/jwt";

class AuthComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      redirect: false
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    const jwt = getJwt();
    if (!jwt) {
      this.setState({ redirect: true });
      return;
    }
    axios
      .get("/getAuth", {
        headers: {
          Authorization: `Bearer ${getJwt()}`,
          role: this.props.userType
        }
      })
      .then(res => {
        this.setState({ user: res.data.authData.user });
      });
  }

  renderRedirect = () => {
    if (this.state.redirect) return <Redirect to={"/"} />;
  };

  render() {
    if (this.state.user === undefined)
      return <div>{this.renderRedirect()}</div>;

    return this.props.children;
  }
}

export default withRouter(AuthComponent);
