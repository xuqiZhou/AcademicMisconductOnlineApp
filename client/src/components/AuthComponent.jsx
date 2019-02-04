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
    this.setState({ redirect: true });
  }

  getUser() {
    const jwt = getJwt();
    if (!jwt) {
      this.setState({ user: null });
      return;
    }
    axios
      .get("/getAuth", {
        headers: { Authorization: getJwt(), role: this.props.userType }
      })
      .then(res => {
        this.setState({ user: res.data });
      });
  }

  renderRedirect = () => {
    if (this.state.redirect) return <Redirect to={"/"} />;
  };

  render() {
    const { user } = this.state;
    if (user === undefined)
      // return <div>Not Authorizated</div>;
      // return <div>{this.renderRedirect()}</div>;
      return <div />;

    if (user === null) this.props.history.push("/");
    return this.props.children;
  }
}

export default withRouter(AuthComponent);
