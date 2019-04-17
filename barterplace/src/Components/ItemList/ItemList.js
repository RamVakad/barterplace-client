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
          let date = new Date(item.dateAdded.$date);
          date = date.toLocaleDateString();
          return {
            name: item.item,
            description: item.description,
            username: item.username,
            date: date,
            image: image,
            category: item.category,
            condition: item.condition
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
        <div className="List">
          {this.state.items.map((item, index) => (
            <div key={index} className="itemCard">
              <ItemCard item={item} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default AddItem;
