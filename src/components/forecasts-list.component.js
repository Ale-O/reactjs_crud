import React, { Component } from "react";
import ElementDataService from "../services/element.service";

export default class ForecastsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveForecasts = this.retrieveForecasts.bind(this);
    this.refreshForecasts = this.refreshForecasts.bind(this);
    this.setActiveForecast = this.setActiveForecast.bind(this);

    this.state = {
      elements: [],
      currentElement: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrieveForecasts();
  }

  retrieveForecasts() {
    ElementDataService.getForecasts()
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

  refreshForecasts() {
    this.retrieveForecasts();
    this.setState({
      currentElement: null,
      currentIndex: -1
    });
  }

  setActiveForecast(element, index) {
    this.setState({
      currentElement: element,
      currentIndex: index
    });
  }

  render() {
    const { elements, currentElement, currentIndex } = this.state;

    return (
      <div className="list row">

        <div className="col-md-6">

          <div className="col-md-12">
          <h4 align='center'>Forecasts</h4>
            <ul className="list-group-item list-group-item-dark">
              {elements &&
                elements.map((element, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveForecast(element, index)}
                    key={index}
                  >
                    {
                    <div>
                      <label>
                        <strong>Forecast </strong>
                      </label>{" "}
                      n° {index + 1}
                    </div>
                    }
                  </li>
                ))}
            </ul>
          </div>

        </div>

        <div className="col-md-6">
          <div className="card mb-4 box-shadow">
            <div class="card-header">
              <h4 align='center'>Forecast</h4>
            </div>
            <div class="card-body">
              


            {currentElement ? (
              <div>
                <div>
                  <label>
                  </label>{" "}
                  {currentElement.map((follow,index)=>(

                    <div>
                      <h3>Succession : </h3>

                      <br/>
                      <label>
                        <strong>Budget line : </strong>
                      </label>{" "}
                      {follow.budget_line}

                      <br/>
                      <label>
                        <strong>Last owner : </strong>
                      </label>{" "}
                      {follow.last_owner}

                      <br/>
                      <label>
                        <strong>Rank last owner : </strong>
                      </label>{" "}
                      {follow.rank_last_owner}

                      <br/>
                      <label>
                        <strong>Release date : </strong>
                      </label>{" "}
                      {follow.release_date}

                      <br/>
                      <label>
                        <strong>New owner : </strong>
                      </label>{" "}
                      {follow.new_owner}

                      <br/>
                      <label>
                        <strong>Last rank new owner : </strong>
                      </label>{" "}
                      {follow.last_rank_new_owner}
                      <hr/>
                    </div>

                  ))}
                </div>
              </div>
            ) : (
              <div>
                <br />
                <p>Select a Forcast...</p>
              </div>
            )}
            </div>
            
          </div>
        </div>

      </div>
    );
  }
}
