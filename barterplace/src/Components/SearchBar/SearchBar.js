import React, { Component } from "react";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

class SeachBar extends Component {
	constructor(props){
		super();
		this.state = {
			item:""
		};
	}
	

	onNameChange = event => {
		this.setState({ item: event.target.value });
	};
	
/*	onSubmitSearch = () => {
    // console.log(this.state.event)
    // console.log(this.state.password)
    // console.log(this.state.isAuthenticated);
		fetch(
			`https://hunterbarter.herokuapp.com/auth/login?username=${
			this.state.email
			}&password=${this.state.password}`,
			{
				method: "get",
				headers: { "Content-Type": "application/json" }
			}
		)
		.then(response => response.json())
		.then(data => {
			if (data.success) {
				this.props.loadUser(data);
				this.setState({
				});
			}
      });
	};
*/
	
	render() {
		return (
			<div className="SeachBar">	
				<div align="right">
					<TextField
						inputStyle={{ textAlign: 'right', cursor: 'none' }}
						label="Item"
						placeholder="eg: xbox"
						type="text"
						className="TextField"
						margin="normal"
						variant="outlined"
						onChange={this.onNameChange}
					/>
				</div>
				
				<div align="right">
					<Button
						variant="contained"
						size="large"
						color="primary"
						//onClick={this.onSumbitSearch}
					>
					Search Item
					</Button>
				</div>
			</div>
		);
	}
}

export default SeachBar;
