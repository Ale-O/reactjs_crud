import React, { Component } from "react";
import ElementDataService from "../services/element.service";

export default class CreateElement extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeRank = this.onChangeRank.bind(this);
    this.onChangeAvailability_date = this.onChangeAvailability_date.bind(this);
    this.onChangeEnd_date = this.onChangeEnd_date.bind(this);
    this.onChangeBudget_line = this.onChangeBudget_line.bind(this);
    this.saveElement = this.saveElement.bind(this);
    this.newElement = this.newElement.bind(this);

    this.state = {
      id: null,
      username: "",
      rank: "", 
      activated: false,
      availability_date: "",
      end_date: "",
      budget_line: "",

      submitted: false
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeRank(e) {
    this.setState({
      rank: e.target.value
    });
  }

  onChangeAvailability_date(e) {
    this.setState({
      availability_date: e.target.value
    });
  }

  onChangeEnd_date(e) {
    this.setState({
      end_date: e.target.value
    });
  }

  onChangeBudget_line(e) {
    this.setState({
      budget_line: e.target.value
    });
  }

  saveElement() {
    var data = {
      username: this.state.username,
      rank: this.state.rank,
      availability_date: this.state.availability_date,
      end_date: this.state.end_date,
      budget_line: this.state.budget_line
    };

    ElementDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          username: response.data.username,
          rank: response.data.rank,
          availability_date: response.data.availability_date,
          end_date: response.data.end_date,
          budget_line: response.data.budget_line,
          activated: response.data.activated,

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
      username: "",
      rank: "",
      availability_date: "",
      end_date: "",
      budget_line: "",
      activated: false,

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
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                required
                value={this.state.username}
                onChange={this.onChangeUsername}
                name="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="rank">
                Rank : 
                <select className="form-control" id="rank" required value={this.state.rank} onChange={this.onChangeRank} name="rank">
                  <option selected value="no_rank">no rank</option>           
                  <option value="rank_A">rank_A</option>
                  <option value="rank_B">rank_B</option>
                </select>
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="availability_date">Availability date</label>
              <input
                type="date"
                className="form-control"
                id="availability_date"
                required
                value={this.state.availability_date}
                onChange={this.onChangeAvailability_date}
                name="availability_date"
              />
            </div>

            <div className="form-group">
              <label htmlFor="end_date">End date</label>
              <input
                type="date"
                className="form-control"
                id="end_date"
                required
                value={this.state.end_date}
                onChange={this.onChangeEnd_date}
                name="end_date"
              />
            </div>

            <div className="form-group">
              <label htmlFor="budget_line">Budget line</label>
              <input
                type="text"
                className="form-control"
                id="budget_line"
                required
                value={this.state.budget_line}
                onChange={this.onChangeBudget_line}
                name="budget_line"
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
