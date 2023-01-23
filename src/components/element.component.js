import React, { Component } from "react";
import ElementDataService from "../services/element.service";
import { withRouter } from '../common/with-router';

class Element extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeField4 = this.onChangeField4.bind(this);
    this.onChangeField5 = this.onChangeField5.bind(this);
    this.getElement = this.getElement.bind(this);
    this.updateActivated = this.updateActivated.bind(this);
    this.updateElement = this.updateElement.bind(this);
    this.deleteElement = this.deleteElement.bind(this);

    this.state = {
      currentElement: {
        id: null,
        title: "",
        description: "",
        field4: "",
        field5: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getElement(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentElement: {
          ...prevState.currentElement,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentElement: {
        ...prevState.currentElement,
        description: description
      }
    }));
  }

  onChangeField4(e) {
    const field4 = e.target.value;
    
    this.setState(prevState => ({
      currentElement: {
        ...prevState.currentElement,
        field4: field4
      }
    }));
  }

  onChangeField5(e) {
    const field5 = e.target.value;
    
    this.setState(prevState => ({
      currentElement: {
        ...prevState.currentElement,
        field5: field5
      }
    }));
  }

  getElement(id) {
    ElementDataService.get(id)
      .then(response => {
        this.setState({
          currentElement: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateActivated(status) {
    var data = {
      id: this.state.currentElement.id,
      title: this.state.currentElement.title,
      description: this.state.currentElement.description,
      published: status,
      field4: this.state.currentElement.field4,
      field5: this.state.currentElement.field5
    };

    ElementDataService.update(this.state.currentElement.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentElement: {
            ...prevState.currentElement,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateElement() {
    ElementDataService.update(
      this.state.currentElement.id,
      this.state.currentElement
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "You updated successfully"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteElement() {    
    ElementDataService.delete(this.state.currentElement.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/elements');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentElement } = this.state;

    return (
      <div>
        {currentElement ? (
          <div className="jumbotron">
          <div className="edit-form">
            <h4 class="card-header" align='center' >Element</h4>
            <hr></hr>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentElement.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentElement.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="field4">Field4</label>
                <input
                  type="text"
                  className="form-control"
                  id="field4"
                  value={currentElement.field4}
                  onChange={this.onChangeField4}
                />
              </div>
              <div className="form-group">
                <label htmlFor="field5">Field5</label>
                <input
                  type="text"
                  className="form-control"
                  id="field5"
                  value={currentElement.field5}
                  onChange={this.onChangeField5}
                />
              </div>
              

              <div className="form-group">
                <label>
                  <strong>State : </strong>
                </label>
                {currentElement.published ? "Activated" : "Deactivated"}
              </div>
            </form>

            {currentElement.published ? (
              <button
                className="m-2 btn btn-md btn-primary"
                onClick={() => this.updateActivated(false)}
              >
                Deactivate
              </button>
            ) : (
              <button
                className="m-2 btn btn-md btn-primary"
                onClick={() => this.updateActivated(true)}
              >
                Activate
              </button>
            )}

            <button
              className="m-2 btn btn-md btn-danger"
              onClick={this.deleteElement}
            >
              Delete
            </button>

            <button
              type="submit"
              className="m-2 btn btn-md btn-success"
              onClick={this.updateElement}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
            </div>


        ) : (
          <div>
            <br />
            <p>Please click on a Element...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Element);