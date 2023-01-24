import React, { Component } from "react";
import ElementDataService from "../services/element.service";
import { withRouter } from '../common/with-router';

class Element extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeRank = this.onChangeRank.bind(this);
    this.onChangeAvailability_date = this.onChangeAvailability_date.bind(this);
    this.onChangeEnd_date = this.onChangeEnd_date.bind(this);
    this.onChangeBudget_line = this.onChangeBudget_line.bind(this);
    this.getElement = this.getElement.bind(this);
    this.updateActivated = this.updateActivated.bind(this);
    this.updateElement = this.updateElement.bind(this);
    this.deleteElement = this.deleteElement.bind(this);

    this.state = {
      currentElement: {
        id: null,
        username: "",
        rank: "",
        availability_date: "",
        end_date: "",
        budget_line: "",
        activated: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getElement(this.props.router.params.id);
  }

  onChangeUsername(e) {
    const username = e.target.value;

    this.setState(function(prevState) {
      return {
        currentElement: {
          ...prevState.currentElement,
          username: username
        }
      };
    });
  }

  onChangeRank(e) {
    const rank = e.target.value;
    
    this.setState(prevState => ({
      currentElement: {
        ...prevState.currentElement,
        rank: rank
      }
    }));
  }

  onChangeAvailability_date(e) {
    const availability_date = e.target.value;
    
    this.setState(prevState => ({
      currentElement: {
        ...prevState.currentElement,
        availability_date: availability_date
      }
    }));
  }

  onChangeEnd_date(e) {
    const end_date = e.target.value;
    
    this.setState(prevState => ({
      currentElement: {
        ...prevState.currentElement,
        end_date: end_date
      }
    }));
  }

  onChangeBudget_line(e) {
    const budget_line = e.target.value;
    
    this.setState(prevState => ({
      currentElement: {
        ...prevState.currentElement,
        budget_line: budget_line
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
      username: this.state.currentElement.username,
      rank: this.state.currentElement.rank,
      activated: status,
      availability_date: this.state.currentElement.availability_date,
      end_date: this.state.currentElement.end_date,
      budget_line: this.state.currentElement.budget_line
    };

    ElementDataService.update(this.state.currentElement.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentElement: {
            ...prevState.currentElement,
            activated: status
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
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={currentElement.username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="form-group">
                <label htmlFor="rank">Rank</label>
                <input
                  type="text"
                  className="form-control"
                  id="rank"
                  value={currentElement.rank}
                  onChange={this.onChangeRank}
                />
              </div>
              <div className="form-group">
                <label htmlFor="availability_date">Availability_date</label>
                <input
                  type="date"
                  className="form-control"
                  id="availability_date"
                  value={currentElement.availability_date}
                  onChange={this.onChangeAvailability_date}
                />
              </div>
              <div className="form-group">
                <label htmlFor="end_date">End_date</label>
                <input
                  type="date"
                  className="form-control"
                  id="end_date"
                  value={currentElement.end_date}
                  onChange={this.onChangeEnd_date}
                />
              </div>
              <div className="form-group">
                <label htmlFor="budget_line">Budget_line</label>
                <input
                  type="text"
                  className="form-control"
                  id="budget_line"
                  value={currentElement.budget_line}
                  onChange={this.onChangeBudget_line}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>State : </strong>
                </label>
                {currentElement.activated ? "Activated" : "Deactivated"}
              </div>
            </form>

            {currentElement.activated ? (
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