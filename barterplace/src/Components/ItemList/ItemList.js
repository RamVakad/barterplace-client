import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import ItemCard from "./ItemCard/ItemCard";
import "./ItemList.css";
var newResponse;
class AddItem extends Component {
  constructor(props) {
    super();
    this.state = { items: [] };
  }

  componentWillReceiveProps(nextProps) {
    let render = "list";
    let renderWishList = false;
    if (nextProps.renderList === "Items") {
      renderWishList = false;
      render = "list";
    } else if (nextProps.renderList === "List") {
      renderWishList = false;
      render = "list/user";
    } else if (nextProps.renderList === "WishList") {
      renderWishList = true;
      render = "list";
    }
    const auth = sessionStorage.getItem("barterAuth");
    if (auth) {
      this.setState({
        isAuthenticated: true
      });
    }
    fetch(`https://hunterbarter.herokuapp.com/${render}`, {
      credentials: "same-origin",
      method: "get",
      headers: { "Content-Type": "application/json", Authorization: auth }
    })
      .then(response => response.json())
      .then(response => {
        //console.log(response);

        newResponse = response.map(item => {
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
            condition: item.condition,
            id: item._id.$oid
          };
        });
      })
      .then(res => {
        if (renderWishList) {
          fetch(`https://hunterbarter.herokuapp.com/favorite`, {
            credentials: "same-origin",
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Authorization: auth
            }
          })
            .then(response => response.json())
            .then(wishlist => {
              if (wishlist.length) {
                let temp = newResponse.filter(value =>
                  wishlist.includes(value.id)
                );
                this.setState({ items: temp });
              } // else {
              //   console.log("no wish");
              //   this.setState({ items: [] });
              // }
            });
        } else {
          console.log("no wish");
          this.setState({ items: newResponse });
        }
      });

    this.setState({ state: this.state });
  }

  render() {
    if (!sessionStorage.getItem("barterAuth")) return <Redirect to="/Login" />;
    return (
      <div className="ItemList">
        <div className="List">
          {this.state.items.length > 0 ? (
            this.state.items.map((item, index) => (
              <div key={index} className="itemCard">
                <ItemCard item={item} rerender={this.props.rerender} />
              </div>
            ))
          ) : (
            <h1>Your {this.props.renderList} could be here...</h1>
          )}
        </div>
      </div>
    );
  }
}

export default AddItem;
