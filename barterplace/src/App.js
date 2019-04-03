import React, { Component } from "react";
import { Route } from "react-router-dom";

import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      route: "signin",
      isSignedIn: false,
      auth: ""
    };
  }
  componentDidMount() {
    const auth = sessionStorage.getItem("barterAuth");
    if (auth) {
      this.setState({
        isSignedIn: true,
        auth: auth
      });
      return;
    }
  }

  loadUser = data => {
    sessionStorage.setItem("barterAuth", data.token);
    this.setState({
      auth: data.token
    });
  };
  render() {
    return (
      <div className="App">
        <Route
          path="/"
          render={props => <Home {...props} auth={this.state.auth} />}
        />
        <Route
          path="/Login"
          render={props => <Login {...props} loadUser={this.loadUser} />}
        />

        <Route
          path="/Register"
          render={props => <Register {...props} loadUser={this.loadUser} />}
        />
      </div>
    );
  }
}

export default App;
