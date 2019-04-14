import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import DialogContent from "@material-ui/core/DialogContent";
import { Redirect } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import AddItem from "../AddItem/AddItem";
import ItemList from "../ItemList/ItemList";
import SearchBox from "../SearchBar/SearchBar";
import { Button } from "@material-ui/core";

import "./Home.css";

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
        <h1>Home</h1>
        <SearchBox />
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={this.toggleAddItemModal}
        >
          Add Item
        </Button>
        <Modal open={this.state.addItemModal} onClose={this.toggleAddItemModal}>
          <DialogContent>
            <AddItem />
          </DialogContent>
        </Modal>
        <ItemList />
      </div>
    );
  }
}

export default Home;
