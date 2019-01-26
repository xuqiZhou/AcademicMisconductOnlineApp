import React, { Component } from "react";
import Navbar from "./MyNavbar";
import Footer from "./Footer";
import Editor from "./Editor";

class CreateModule extends Component {
  state = {};

  componentDidMount() {
    fetch(`/admin/edit/editmodule/quiz/${this.props._id}`)
      .then(res => res.json())
      .then(module =>
        this.setState(
          {
            moduleId: module._id,
            moduleCode: module.moduleCode,
            title: module.title,
            body: module.body
          },
          () => {
            console.log(this.state);
          }
        )
      );
  }

  render() {
    return (
      <React.Fragment>
        <Navbar role={this.props.role} />
        <Editor _id={this.props._id} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default CreateModule;
