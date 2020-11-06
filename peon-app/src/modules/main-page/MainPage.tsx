
import React, {Component, ReactText} from 'react';

type Props = {};
type State = {};

export default class Login extends Component<Props, State> {

  
	render() {
		return (
	      <div >
	        <form noValidate action="/login">
	          <text
	            id="email"
	            name="email"
	          />
	        
	        </form>
		  </div>);
	};
}