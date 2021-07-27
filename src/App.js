import React, { Component , useState} from "react";
import { BrowserRouter as Router,Route,Switch } from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import Login from './login/login';
import User from './users/user';
import Add from './addUser/add';
function App() {
  return (
    <div className="App">
    <Router>
      <div>

        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/user/add">
            <Add />
          </Route>
          <Route path="/users">
            <User />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
