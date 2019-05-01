import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

class AddItem extends Component {
  constructor(props) {
    super();
    this.state = {
      //   name: "",
      //   description: "",
      //   selectedFile: null,
      //   condition: "",
      //   category: ""
    };
  }
  submitProfile = () => {
    const auth = sessionStorage.getItem("barterAuth");
    if (auth) {
      var form = new FormData();
      form.append("picture", this.state.selectedFile);

      fetch(
        `https://hunterbarter.herokuapp.com/list/add?item=${
          this.state.name
        }&description=${this.state.description}&condition=${
          this.state.condition
        }&category=${this.state.category}`,
        {
          method: "post",
          headers: {
            Authorization: auth
          },
          body: form
        }
      )
        .then(response => response.json())
        .then(res => this.props.close());
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
        <h1>Profile</h1>
        <TextField
          label="Name"
          value={this.state.name}
          onChange={this.handleChange("name")}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <br />
        <TextField
          label="Phone Number"
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
        <div className="buttons">
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={this.submitItem}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={this.props.close}
          >
            Close
          </Button>
        </div>
      </div>
    );
  }
}

export default AddItem;
