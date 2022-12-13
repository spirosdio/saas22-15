import React from 'react'

import { Redirect, Route } from 'react-router-dom'
import axios from "axios";
import  { useState, useEffect } from "react";


const PrivateRoute = ({ component: Component, ...rest }) => {

  const [user, setUser] = useState([]);

  const getUser = () => {  
    axios({
     method: "GET",
     withCredentials: true,
     url: "http://localhost:5000/user/get-user",
   }).then((res) => {
     setUser(res.data._id)
   });
  };
  useEffect(() => {getUser()},[]);
  const isLoggedIn = user;

  return (
    <Route
      {...rest}
      render={props =>{
        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }}
    />
  )
}

export default PrivateRoute