import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import renderHTML from "react-render-html";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleId: "",
      title: "",
      body: ""
    };
    //bind
    this.onChange = this.onChange.bind(this);
    this.moveOnToQuiz = this.moveOnToQuiz.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    fetch(`/admin/edit/editmodule/${this.props.moduleName}`)
      .then(res => res.json())
      .then(module =>
        this.setState(
          { moduleId: module._id, title: module.title, body: module.body },
          () => {
            console.log(this.state);
          }
        )
      );
  }

  onChange(e) {
    this.setState({ body: e });
    console.log(this.state.body);
  }

  onSave(e) {
    e.preventDefault();
    const newContent = {
      title: this.state.title,
      body: this.state.body,
      public: false
    };
    axios.post("/admin/edit", newContent).then(res => console.log(res.data));
  }

  moveOnToQuiz(e) {
    // e.preventDefault();
    const newContent = {
      title: this.state.title,
      body: this.state.body,
      published: false
    };
    axios.post("/admin/edit", newContent).then(res => console.log(res.data));

    this.setState({
      title: "",
      body: ""
    });
  }

  render() {
    return (
      <div className="container my-5">
        <form>
          <div className="form-group">
            <input
              value={this.state.title}
              className="form-control"
              type="text"
              name="title"
              placeholder={this.state.title === "" ? "Title" : this.state.title}
              onChange={e => {
                this.setState({ title: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <ReactQuill
              style={{ height: "300px" }}
              modules={Editor.modules}
              format={Editor.modules}
              value={this.state.body}
              placeholder={this.state.body === "" ? "Edit..." : this.state.body}
              onChange={this.onChange}
            />
          </div>
          <div>
            <h1 className="text-center my-5 py-5">{this.state.title}</h1>
            <p>{renderHTML(this.state.body)}</p>
          </div>
          <div className="row pb-5">
            <div className="col" />
            <div className="btn-group" role="group" aria-label="...">
              <Button color="danger" size="lg" onClick={this.onSave}>
                Save
              </Button>
              <Link
                to={`/admin/edit/handlesubmit/${this.state.moduleId}`}
                className="text-white btn btn-lg btn-dark"
                onClick={this.moveOnToQuiz}
              >
                Continue
              </Link>
            </div>
            <div className="col" />
          </div>
        </form>
      </div>
    );
  }
}

Editor.modules = {
  toolbar: [
    [{ size: [] }],
    [{ header: [false, 6, 5, 4, 3, 2, 1] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: ["", "center", "right", "justify"] }],
    [{ indent: "-1" }, { indent: "+1" }],
    [({ color: [] }, { background: [] })],
    ["link", "image", "video", "formula"]
  ]
};

Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "background",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "formula",
  "code-block",
  "align"
];

export default Editor;
