import React, { Component } from "react";
import "./Home.css";
import Navigation from "../Navigation/Navigation";
import { Redirect } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super();
    this.state = {};
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
