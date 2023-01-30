import React, { Component } from "react";
import ElementDataService from "../services/element.service";
import { Link } from "react-router-dom";

export default class ElementsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchUsername = this.onChangeSearchUsername.bind(this);
    this.retrieveElements = this.retrieveElements.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveElement = this.setActiveElement.bind(this);
    this.removeAllElements = this.removeAllElements.bind(this);
    this.searchUsername = this.searchUsername.bind(this);

    this.state = {
      elements: [],
      currentElement: null,
      currentIndex: -1,
      searchUsername: ""
    };
  }

  componentDidMount() {
    this.retrieveElements();
  }

  onChangeSearchUsername(e) {
    const searchUsername = e.target.value;

    this.setState({
      searchUsername: searchUsername
    });
  }

  retrieveElements() {
    ElementDataService.getAll()
      .then(response => {
        this.setState({
          elements: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveElements();
    this.setState({
      currentElement: null,
      currentIndex: -1
    });
  }

  setActiveElement(element, index) {
    this.setState({
      currentElement: element,
      currentIndex: index
    });
  }

  removeAllElements() {
    ElementDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchUsername() {
    this.setState({
      currentElement: null,
      currentIndex: -1
    });

    ElementDataService.findByUsername(this.state.searchUsername)
      .then(response => {
        this.setState({
          elements: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchUsername, elements, currentElement, currentIndex } = this.state;

    return (
      <div className="list row">

        <div className="list row col-md-6">

          <div className="col-md-12">
            <div className="input-group mb-3">
            <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.searchUsername}
                >
                  Search
                </button>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Find element by username"
                value={searchUsername}
                onChange={this.onChangeSearchUsername}
              />
            </div>
          </div>

          <div className="col-md-12">
            <h4 align='center'>Elements List</h4>
            <ul className="list-group-item list-group-item-dark">
              {elements &&
                elements.map((element, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveElement(element, index)}
                    key={index}
                  >
                    {element.username}
                  </li>
                ))}
            </ul>
            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={this.removeAllElements}
            >
              Delete All
            </button>
          </div>

        </div>

        <div className="col-md-6">
          <div className="card mb-4 box-shadow">
            <div class="card-header">
              <h4 align='center'>Element</h4>
            </div>
            <div class="card-body">
            {currentElement ? (
              <div>
                <div>
                  <label>
                    <strong>Username : </strong>
                  </label>{" "}
                  {currentElement.username}
                </div>
                <div>
                  <label>
                    <strong>Rank : </strong>
                  </label>{" "}
                  {currentElement.rank}
                </div>
                <div>
                  <label>
                    <strong>Availability date : </strong>
                  </label>{" "}
                  {currentElement.availability_date}
                </div>
                <div>
                  <label>
                    <strong>End date : </strong>
                  </label>{" "}
                  {currentElement.end_date}
                </div>
                <div>
                  <label>
                    <strong>Budget line : </strong>
                  </label>{" "}
                  {currentElement.budget_line}
                </div>
                <div>
                  <label>
                    <strong>State : </strong>
                  </label>{" "}
                  {currentElement.activated ? "Activated" : "Deactivated"}
                </div>

                <Link
                  to={"/elements/" + currentElement.id}
                  className="m-3 btn btn-md btn-primary"
                >
                  Edit
                </Link>
              </div>
            ) : (
              <div>
                <br />
                <p>Select a Element...</p>
              </div>
            )}
            </div>
            
          </div>
        </div>

      </div>
    );
  }
}
