import React, { Component } from "react";
import "./Home.css";
import Navigation from "../Navigation/Navigation";
import { Redirect } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentDidMount() {
    const auth = sessionStorage.getItem("barterAuth");
    if (auth) {
      this.setState({
        isAuthenticated: true
      });
    }
    console.log(auth);
    fetch(`https://hunterbarter.herokuapp.com/user`, {
      credentials: "same-origin",
      method: "get",
      headers: { "Content-Type": "application/json", Authorization: auth }
    });
  }

  signOut = () => {
    this.setState({
      state: this.state
    });
  };

  render() {
    if (!sessionStorage.getItem("barterAuth")) return <Redirect to="/Login" />;
    return (
      <div className="Home">
        <Navigation signOut={this.signOut} />
        <h1>Home</h1>
      </div>
    );
  }
}

export default Home;
