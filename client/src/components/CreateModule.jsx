import React, { Component } from "react";
import Navbar from "./MyNavbar";
import Footer from "./Footer";
import Editor from "./Editor";

class CreateModule extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Navbar role={this.props.role} />
        <Editor moduleName={this.props.moduleName} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default CreateModule;
