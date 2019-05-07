import React, { Component } from "react";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import "./SearchBar.css";

class SeachBar extends Component {
  constructor(props) {
    super();
    this.state = {
      item: ""
    };
  }

  onNameChange = event => {
    console.log(event.target.value);
    this.setState({ item: event.target.value });
  };

  onSubmitSearch = () => {
    const auth = sessionStorage.getItem("barterAuth");
    fetch(`https://hunterbarter.herokuapp.com/?search=${this.state.item}`, {
      credentials: "same-origin",
      method: "get",
      headers: { "Content-Type": "application/json", Authorization: auth }
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log(data);
        }
      });
  };

  render() {
    return (
      <div className="SearchBarContainer">
        <TextField
          //inputStyle={{ textAlign: "right", cursor: "none" }}
          //fullWidth
          label="Item"
          placeholder="eg: xbox"
          type="text"
          className="SearchBar"
          margin="normal"
          variant="outlined"
          onChange={this.onNameChange}
        />
        <Button
          variant="contained"
          //size="large"
          margin="normal"
          color="primary"
          className="searchButton"
          onClick={this.onSumbitSearch}
        >
          Search
        </Button>
      </div>
    );
  }
}

export default SeachBar;
