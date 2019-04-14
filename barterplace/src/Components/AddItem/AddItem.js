import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

import "./AddItem.css";

class AddItem extends Component {
  constructor(props) {
    super();
    this.state = { name: "", description: "", selectedFile: null };
  }

  submitItem = () => {
    const auth = sessionStorage.getItem("barterAuth");
    if (auth) {
      let fd = new FormData();
      fd.append("pic", this.state.selectedFile, "pic");
      // let payload = {
      //   name: this.state.name,
      //   description: this.state.description,
      //   picture: this.state.selectedFile
      // };
      console.log(fd);
      fetch(
        `https://hunterbarter.herokuapp.com/user/profilePicture`,
        {
          credentials: "same-origin",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: auth
          }
        },
        fd
      )
        .then(response => response.json())
        .then(res => console.log(res));
    }
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  fileSelectHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
    console.log("selectedFile");
  };

  render() {
    if (!sessionStorage.getItem("barterAuth")) return <Redirect to="/Login" />;
    return (
      <div className="AddItem">
        <h1>Add Item</h1>
        <TextField
          label="Item Name"
          value={this.state.name}
          onChange={this.handleChange("name")}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <br />
        <TextField
          label="Description"
          multiline
          rows="4"
          value={this.state.description}
          onChange={this.handleChange("description")}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <h2>Add Image</h2>
        <input type="file" onChange={this.fileSelectHandler} />
        <br />
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={this.submitItem}
        >
          Submit
        </Button>
      </div>
    );
  }
}

export default AddItem;
