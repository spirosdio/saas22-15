import logo from "./logo.png";

import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from './PrivateRoute'
import HomeRoute from './HomeRoute'
import Main1 from "./Main1";

import Home from "./Home";
import Profile from "./Profile";
import About from "./About.js";

import { BrowserRouter as Router,Routes, Route, Switch, Redirect } from "react-router-dom";

//import { Router, Route, Redirect, Switch } from "react-router-dom";

import axios from "axios";

import React, { useState, useEffect } from "react";

function App() {
  /*
  const [user, setUser] = useState(null);


  const getUser = () => {  
    axios({
     method: "GET",
     withCredentials: true,
     url: "http://localhost:5000/auth/user",
   }).then((res) => {
     setUser(res.data._id)
   });
  };
  useEffect(() => {getUser()},[]);
  console.log(user);
  //let a=1;
  //if(!user) a=null; 
  */
  /*
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
  /*
  return (
		<div className="App">
			<Router>
        <Routes>
				<Route
					exact
					path="/"
					element={user ? <Redirect to="main1"/>: <Redirect to="/"/>}
				/>
				<Route
					exact
					path="/main1"
					element={user ? <Redirect to="main1"/> : <Redirect to="/" />}
				/>
				<Route
          
					path="/profile"
					element={user ? <Redirect to="profile"/> : <Redirect to="/" />}
				/>
        </Routes>
			</Router>
		</div>
	);
  */
  return (
    <Router>
      <div className="App">
          <HomeRoute exact path="/" component={Home}/>
          <PrivateRoute  path="/main1" component={Main1}/>
          <PrivateRoute  path="/profile" component={Profile}/>
          <Route path="/About" component={About}/>
      </div>
    </Router>
  );


}

export default App;
