import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Container,
  Form,
  FormGroup,
  Col,
  Button,
  Input,
  FormFeedback
} from "reactstrap";
import { Modal } from "react-bootstrap";
import axios from "axios";
import Navbar from "./MyNavbar";
import Footer from "./Footer";

class EditPage extends Component {
  constructor() {
    super();
    this.handleShowCreate = this.handleShowCreate.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleCloseCreate = this.handleCloseCreate.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
    this.deleteModule = this.deleteModule.bind(this);
    this.makePublic = this.makePublic.bind(this);
    this.state = {
      existingModules: [],
      show: false,
      showCreate: false,
      newModuleCode: "",
      redirect: false,
      newModuleId: "",
      disBtn: true,
      invalidCode: false,
      moduleCodeExist: false
    };
  }

  //   Get all existing modules and display inside the modal
  componentDidMount() {
    fetch("/admin/edit")
      .then(res => res.json())
      .then(existingModules => this.setState({ existingModules }, () => {}));
  }

  componentDidUpdate() {
    fetch("/admin/edit")
      .then(res => res.json())
      .then(existingModules => this.setState({ existingModules }, () => {}));
  }
  // handle close and open for btn 'edit existing module'
  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ show: true });
  }
  // handle close and open for btn 'Create new moudle'
  handleCloseCreate() {
    this.setState({ showCreate: false });
  }
  handleShowCreate() {
    this.setState({ showCreate: true });
  }

  deleteModule(e) {
    const moduleId = e.target.value;
    axios.delete(`/admin/edit/delete/${moduleId}`);
  }

  // Create Brand New Module
  clickCreate = () => {
    const moduleCode = this.state.newModuleCode;
    if (moduleCode.length < 1) {
      this.setState({ invalidCode: true });
    } else {
      const newModule = {
        moduleCode: moduleCode,
        title: "",
        body: "",
        public: false
      };
      axios.post("/admin/edit", newModule).then(res => {
        if (!res.data._id) {
          this.setState({ moduleCodeExist: true, invalidCode: true });
        }
        this.setState({ newModuleId: res.data._id, disBtn: false });
      });
    }
  };

  setRedirect() {
    this.setState({
      redirect: true
    });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return (
        <Redirect to={`/admin/edit/editmodule/${this.state.newModuleId}`} />
      );
    }
  };

  makePublic(e) {
    axios.post("/admin/edit/editmodule/updatestatus", {
      _id: e.target.value,
      public: true
    });
  }

  makePrivate(e) {
    axios.post("/admin/edit/editmodule/updatestatus", {
      _id: e.target.value,
      public: false
    });
  }

  getPublishedModules() {
    let target = [];
    for (let prop in this.state.existingModules) {
      if (this.state.existingModules.hasOwnProperty(prop)) {
        target[prop] = this.state.existingModules[prop];
      }
    }
    target = target.filter(module => module.public === true);
    return target.map(module => (
      <React.Fragment key={module._id}>
        <div className="row m-5">
          <div className="col h4">{module.moduleCode}</div>
          <div className="col">
            <div className="btn-group" role="group" aria-label="...">
              <Button color="secondary" size="sm">
                <Link
                  style={{ textDecoration: "none" }}
                  className="text-white"
                  to={`/admin/edit/editmodule/${module._id}`}
                >
                  Edit
                </Link>
              </Button>
              <Button
                className="text-white btn-sm btn-dark"
                value={module._id}
                onClick={this.makePrivate}
              >
                Hide
              </Button>
              <Button
                className="text-white"
                size="sm"
                color="danger"
                value={module._id}
                onClick={this.deleteModule}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
        <hr className="d-block" style={{ width: "80%" }} />
      </React.Fragment>
    ));
  }

  getPrivateModules() {
    let target = [];
    for (let prop in this.state.existingModules) {
      if (this.state.existingModules.hasOwnProperty(prop)) {
        target[prop] = this.state.existingModules[prop];
      }
    }
    target = target.filter(module => module.public === false);
    return target.map(module => (
      <React.Fragment key={module._id}>
        <div className="row m-5">
          <div className="col h4">{module.moduleCode}</div>
          <div className="col">
            <div className="btn-group" role="group" aria-label="...">
              <Button color="secondary" size="sm">
                <Link
                  style={{ textDecoration: "none" }}
                  className="text-white"
                  to={`/admin/edit/editmodule/${module._id}`}
                >
                  Edit
                </Link>
              </Button>
              <Button
                className="text-white btn-sm btn-dark"
                value={module._id}
                onClick={this.makePublic}
              >
                Publish
              </Button>
              <Button
                className="text-white"
                size="sm"
                color="danger"
                value={module._id}
                onClick={this.deleteModule}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
        <hr className="d-block" style={{ width: "80%" }} />
      </React.Fragment>
    ));
  }

  render() {
    return (
      <React.Fragment>
        {this.renderRedirect()}
        <Navbar role={this.props.type} page="quiz" />
        <Container>
          <h2 className="text-center mt-5 pt-5">Instruction</h2>
          <div className="row" style={{ minHeight: "400px" }}>
            <div className="col" />
            <p className="pb-5 m-5">
              <ul>
                <li>
                  From this page, you can create and edit the modules which will
                  appear for students and guests.
                </li>
                <li>
                  A new module will require a unique module code, composed of
                  letters and/or numbers. New modules are "hidden" by defualt,
                  and cannot be viewed.
                </li>
                <li>
                  Click "edit existing module" to see a list of all modules.
                  Click the "edit" button beside a module to begin editing. Be
                  sure to click "save" after making any changes.
                </li>
                <li>
                  When the module's content and quiz are complete, under "edit
                  existing module," you may click "publish" to make the module
                  visible to students and guests.
                </li>
                <li>
                  To delete a module, click "delete" beside the module you wish
                  to delete. Be careful, as deleted modules cannot be recovered.
                </li>
              </ul>
            </p>
            <div className="col" />
          </div>
          <div className="row pb-5">
            <div className="col-md" />
            <div className="btn-group" role="group" aria-label="...">
              <div
                onClick={this.handleShowCreate}
                className="text-white btn btn-lg btn-dark"
              >
                Create New Module
              </div>
              <div
                onClick={this.handleShow}
                className="text-white btn btn-lg btn-secondary"
              >
                Edit Existing Module
              </div>

              {/* make new module */}
              <Modal
                show={this.state.showCreate}
                onHide={this.handleCloseCreate}
              >
                <Modal.Header>
                  <Modal.Title style={{ margin: "0 auto" }} className="row">
                    Create New Module
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                  <Form>
                    <FormGroup row>
                      <Col sm={7}>
                        <Input
                          invalid={this.state.invalidCode}
                          onChange={e => {
                            this.setState({ newModuleCode: e.target.value });
                          }}
                          placeholder="Enter Unique Module Code"
                        />
                        <FormFeedback className="text-left">
                          {this.state.moduleCodeExist
                            ? "Module Code Exists"
                            : "Please Enter a Valid Code"}
                        </FormFeedback>
                      </Col>
                      <Col sm={{ size: 5 }}>
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="..."
                        >
                          <Button
                            color={this.state.disBtn ? "danger" : "secondary"}
                            disabled={!this.state.disBtn}
                            onClick={this.clickCreate}
                          >
                            Create
                          </Button>
                          <Button
                            color={!this.state.disBtn ? "danger" : "secondary"}
                            disabled={this.state.disBtn}
                            onClick={this.setRedirect}
                          >
                            Edit
                          </Button>
                        </div>
                      </Col>
                    </FormGroup>
                  </Form>
                </Modal.Body>
              </Modal>

              {/* Edit Existing */}
              <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header>
                  <Modal.Title style={{ margin: "0 auto" }} className="row">
                    Public Module
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                  {this.getPublishedModules()}
                </Modal.Body>

                <Modal.Title style={{ margin: "0 auto" }} className="row">
                  Not Yet Public
                </Modal.Title>
                <Modal.Body className="text-center">
                  {this.getPrivateModules()}
                </Modal.Body>
              </Modal>
            </div>
            <div className="col-md" />
          </div>
          <hr id="editingcanvas" className="my-5" style={{ width: "80%" }} />
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}
export default EditPage;
