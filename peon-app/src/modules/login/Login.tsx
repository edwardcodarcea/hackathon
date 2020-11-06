
import React, {Component, ReactText} from 'react';
import { Button, FormGroup, FormControl} from "react-bootstrap";
type Props = {};
type State = {};

export default class Login extends Component<Props, State> {

  
	handleSubmit = () => {

	};

	render() {
		return (
			<div className="Login">
			<form onSubmit={this.handleSubmit}>
			  <FormGroup controlId="email">
				<label>Email</label>
				<FormControl
				  autoFocus
				  type="email"
				  value={""}
				/>
			  </FormGroup>
			  <FormGroup controlId="password">
				<label>Password</label>
				<FormControl
				  value={""}
				  type="password"
				/>
			  </FormGroup>
			  <Button block type="submit">
				Login
			  </Button>
			</form>
		  </div>
		  );
	};
}