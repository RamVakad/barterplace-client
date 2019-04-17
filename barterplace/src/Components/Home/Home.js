import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import DialogContent from "@material-ui/core/DialogContent";
import { Redirect } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import AddItem from "../AddItem/AddItem";
import ItemList from "../ItemList/ItemList";
import { Button } from "@material-ui/core";

import logo from "./hunter-college-logo.png";
import "./Home.css";
//import Navbar from "../Navbar/Navbar";

class Home extends Component {
  constructor(props) {
    super();
    this.state = { addItemModal: false };
  }

  componentDidMount() {
    const auth = sessionStorage.getItem("barterAuth");
    if (auth) {
      this.setState({
        isAuthenticated: true
      });
    }
    // console.log(auth);
    // fetch(`https://hunterbarter.herokuapp.com/user`, {
    //   credentials: "same-origin",
    //   method: "get",
    //   headers: { "Content-Type": "application/json", Authorization: auth }
    // });
  }

  signOut = () => {
    this.setState({
      state: this.state
    });
  };
  toggleAddItemModal = () => {
    this.setState({
      addItemModal: !this.state.addItemModal
    });
  };

  render() {
    if (!sessionStorage.getItem("barterAuth")) return <Redirect to="/Login" />;
    return (
      <div className="Home">
        <Navigation signOut={this.signOut} />
        <img src={logo} width="20%" alt="hunter" />
        <h1 id="banner">Hunter Barter App</h1>

        <Modal open={this.state.addItemModal} onClose={this.toggleAddItemModal}>
          <DialogContent>
            <AddItem />
          </DialogContent>
        </Modal>
        <Button variant="primary" onClick={this.toggleAddItemModal}>
          Add Item
        </Button>

        <ItemList />
        {/* <div id="body">
          <div id="card-wrapper" class="card  mb-3">
            <div class="card-body">
              <div class="card bg-light mb-3">
                <div class="card-header">Computers and Technology</div>
                <div class="card-body">
                  <img src={require("./macbook.jpg")} />
                  <h4 class="card-title">
                    Macbook Pro 13-inch retina display Quad Core
                  </h4>
                  <p class="card-text">
                    Good for Editing videos, Photoshop, Adobe, and Coding with
                    Visual Studios. 256 GB Storage with 16GB RAM Customized
                    laptop
                  </p>
                  <p>Condition: NEW</p>
                  <a>Contact Seller</a>
                </div>
              </div>

              <div class="card bg-light mb-3">
                <div class="card-header">Things that are Fire</div>
                <div class="card-body">
                  <img src={require("./mixtape.jpeg")} />
                  <h4 class="card-title">Rene's Super Fire Mixtape</h4>
                  <p class="card-text">Proceed with Caution.</p>
                  <p>Condition: GOOD</p>
                  <a>Contact Seller</a>
                </div>
              </div>

              <div class="card bg-light mb-3">
                <div class="card-header">Eduction and Books</div>
                <div class="card-body">
                  <img src={require("./textbook.jpg")} />
                  <h4 class="card-title">Economics Textbook</h4>
                  <p class="card-text">
                    Aggregate Demand and Aggregate Supply Graphs and the History
                    of Economics.
                  </p>
                  <p>Condition: GOOD</p>
                  <a>Contact Seller</a>
                </div>
              </div> 
            </div>
          </div>
        </div>*/}
      </div>
    );
  }
}

export default Home;
