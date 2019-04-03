import React, { Component } from "react";

import "./AddItem.css";

class AddItem extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    if (!sessionStorage.getItem("barterAuth")) return <Redirect to="/Login" />;
    return (
      <div className="AddItem">
        <h1>AddItem</h1>
      </div>
    );
  }
}

export default AddItem;
