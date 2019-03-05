/* jshint ignore: start */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./MyNavbar";
import Footer from "./Footer";
import renderHTML from "react-render-html";

class ModulePage extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      moduleCode: "",
      buttonHidden: true
    };
  }

  componentDidMount() {
    fetch(`/module/${this.props.moduleCode}`)
      .then(res => res.json())
      .then(module => {
        this.setState({
          title: module.title,
          body: module.body,
          moduleCode: module.moduleCode,
          buttonHidden: false
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        <Navbar role={this.props.type} page="module" />
        {this.state.buttonHidden ? (
          <h1 className="text-center m-5 p-5">Loading...</h1>
        ) : null}
        <div className="container">
          <div className="mx-md-5">
            <h1 className="text-center my-5 py-5">{this.state.title}</h1>
            {renderHTML(this.state.body)}
            <div hidden={this.state.buttonHidden} className="m-5">
              <Link
                to={this.state.moduleCode + "/quiz"}
                className="btn btn-danger col mt-3"
              >
                Quiz
              </Link>
            </div>
          </div>
        </div>
        {this.state.buttonHidden ? null : <Footer />}
      </React.Fragment>
    );
  }
}

export default ModulePage;
