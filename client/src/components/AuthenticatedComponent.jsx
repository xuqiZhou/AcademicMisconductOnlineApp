import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
class AuthenticatedComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
  }

  getJWT() {
    return localStorage.getItem("cool-jwt");
  }

  componentDidMount() {
    const jwt = this.getJWT();
    console.log(jwt);
    if (jwt) {
      this.props.history.push("/");
      axios
        .get("/adminrestricted", {
          headers: { Authorization: `Bearer ${jwt}` }
        })
        .then(res => {
          this.setState({ user: res.data });
          console.log(this.state);
        })
        .catch(err => {
          localStorage.removeItem("cool-jwt");
          this.props.history.push("/");
        });
    }
  }

  render() {
    if (this.state.user === undefined) return <div />;
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

export default withRouter(AuthenticatedComponent);
