/* jshint ignore: start */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import UWImage from "../UW_left-stack_white.png";
import Modal from "./Modal";

class MyNavbar extends Component {
  state = {
    student: [{ name: "Home", href: "/student/home" }],
    admin: [
      { name: "Edit", href: "/admin/edit" },
      { name: "Home", href: "/admin/home" }
    ],
    guest: [{ name: "Home", href: "/home" }]
  };
  styles = {
    logo: { width: "8rem" }
  };

  render() {
    return (
      <React.Fragment>
        <nav
          style={{ borderRadius: 0, position: "fixed !important" }}
          className="navbar navbar-expand-lg bg-dark fixed-top mb-0"
        >
          <a className="nav-link" href="https://www.uwinnipeg.ca/">
            <img
              src={UWImage}
              style={this.styles.logo}
              className="img-fluid"
              alt="UW logo"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <ul className="navbar-nav ml-auto">
            {this.getLinks(this.props.role)}
          </ul>
          {this.props.role === "guest" ? (
            <Link className="mx-5 text-white" to="/">
              Login
            </Link>
          ) : (
            <Modal userStatus={this.props.role} />
          )}
        </nav>
      </React.Fragment>
    );
  }

  getLinks(role) {
    let links;
    if (role.toUpperCase() === "STUDENT") {
      links = this.state.student;
    } else if (role.toUpperCase() === "ADMIN") {
      links = this.state.admin;
    } else {
      links = this.state.guest;
    }
    return links.map(link => (
      <li key={link.href} className="nav-item">
        <Link
          style={{ textDecoration: "none" }}
          to={link.href}
          className="text-white mr-3 ml-3"
        >
          {link.name}
        </Link>
      </li>
    ));
  }
}

export default MyNavbar;
