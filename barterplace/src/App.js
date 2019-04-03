import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Login" component={Login} />
          <Route path="/Register" component={Register} />
        </Switch>
      </div>
    );
  }
}

export default App;
