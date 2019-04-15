import React, { Component } from "react";

class SeachBar extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="SeachBar">
        <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="text" placeholder="Search"/>
            <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
          </form>
      </div>
    );
  }
}

export default SeachBar;
