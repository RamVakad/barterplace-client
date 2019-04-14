import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./ItemList.css";

class AddItem extends Component {
  constructor(props) {
    super();
    this.state = { items: [] };
  }
  componentDidMount() {
    const auth = sessionStorage.getItem("barterAuth");
    if (auth) {
      this.setState({
        isAuthenticated: true
      });
    }
    fetch(`https://hunterbarter.herokuapp.com/list/user`, {
      credentials: "same-origin",
      method: "get",
      headers: { "Content-Type": "application/json", Authorization: auth }
    })
      .then(response => response.json())
      .then(response => console.log(response));
  }
  render() {
    if (!sessionStorage.getItem("barterAuth")) return <Redirect to="/Login" />;
    return (
      <div className="ItemList">
        <h1>ItemList</h1>
        <ul>
          {this.state.items.map(item => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AddItem;
