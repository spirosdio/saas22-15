import logo from "./logo.png";

import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Main1 from "./Main1";

import Home from "./Home";
import Profile from "./Profile";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import axios from "axios";

import React, { useState, useEffect } from "react";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home> </Home>
          </Route>

          <Route exact path="/main1">
            <Main1> </Main1>
          </Route>
          <Route exact path="/profile">
            <Profile> </Profile>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
