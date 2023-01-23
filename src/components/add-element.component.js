import React, { Component } from "react";
import ElementDataService from "../services/element.service";

export default class CreateElement extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeField4 = this.onChangeField4.bind(this);
    this.onChangeField5 = this.onChangeField5.bind(this);
    this.saveElement = this.saveElement.bind(this);
    this.newElement = this.newElement.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "", 
      published: false,
      field4: "",
      field5: "",

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeField4(e) {
    this.setState({
      field4: e.target.value
    });
  }

  onChangeField5(e) {
    this.setState({
      field5: e.target.value
    });
  }

  saveElement() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      field4: this.state.field4,
      field5: this.state.field5
    };

    ElementDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          field4: response.data.field4,
          field5: response.data.field5,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newElement() {
    this.setState({
      id: null,
      title: "",
      description: "",
      field4: "",
      field5: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You created successfully!</h4>
            <button className="btn btn-success" onClick={this.newElement}>
              Create
            </button>
          </div>
        ) : (
          <div className="jumbotron">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="field4">Field4</label>
              <input
                type="text"
                className="form-control"
                id="field4"
                required
                value={this.state.field4}
                onChange={this.onChangeField4}
                name="field4"
              />
            </div>

            <div className="form-group">
              <label htmlFor="field5">Field5</label>
              <input
                type="text"
                className="form-control"
                id="field5"
                required
                value={this.state.field5}
                onChange={this.onChangeField5}
                name="field5"
              />
            </div>
            <div class="col-md-12 text-center">
              <button onClick={this.saveElement} className="btn btn-success">
                Create
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
