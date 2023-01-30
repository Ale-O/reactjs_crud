import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import CreateElement from "./components/add-element.component";
import Element from "./components/element.component";
import ElementsList from "./components/elements-list.component";
import ForecastsList from "./components/forecasts-list.component";
import ElementsActivatedList from "./components/elements-activated-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/elements"} className="navbar-brand">
            Skeleton
          </Link>
          <div className="navbar-nav mr-auto">
          </div>
          <span class="navbar-nav">           
              <li className="nav-item active">
                <Link to={"/elements"} className="nav-link">
                  All Elements
                </Link>
              </li>
              <li className="nav-item active">
                <Link to={"/elements/activated"} className="nav-link">
                  Elements activated
                </Link>
              </li> 
              <li className="nav-item active">
                <Link to={"/forecasts"} className="nav-link">
                  Forecasts
                </Link>
              </li> 
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Create
                </Link>
              </li>
          </span>
        </nav>

        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<ElementsList/>} />
            <Route path="/elements" element={<ElementsList/>} />
            <Route path="/forecasts" element={<ForecastsList/>} />
            <Route path="/elements/activated" element={<ElementsActivatedList/>} />
            <Route path="/add" element={<CreateElement/>} />
            <Route path="/elements/:id" element={<Element/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
