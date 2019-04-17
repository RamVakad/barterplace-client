import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import ItemCard from "./ItemCard/ItemCard";
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
    fetch(`https://hunterbarter.herokuapp.com/list`, {
      credentials: "same-origin",
      method: "get",
      headers: { "Content-Type": "application/json", Authorization: auth }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        let newResponse = response.map(item => {
          let image = new Image();
          image.src = "data:image/jpeg;base64," + item.picture.$binary;
          return {
            name: item.item,
            description: item.description,
            username: item.username,
            image: image
          };
        });
        console.log(newResponse);
        this.setState({ items: newResponse });
        // newResponse[0].image = new Image();
        // console.log(newResponse);
        // newResponse[0].image.src =
        //   "data:image/jpeg;base64," + response[0].picture.$binary;
        //
      });
  }
  render() {
    if (!sessionStorage.getItem("barterAuth")) return <Redirect to="/Login" />;
    return (
      <div className="ItemList">
        <h1>ItemList</h1>
        <div style={{ position: "relative", width: "1000px" }} />
        {this.state.items.map((item, index) => (
          <div key={index}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <img src={`${item.image.src}`} alt={"something"} />
            <p>{item.username}</p>
            <ItemCard />
          </div>
        ))}
      </div>
    );
  }
}

export default AddItem;
