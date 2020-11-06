import React, {Component} from 'react';
import {Button, FormControl, FormGroup} from "react-bootstrap";

type Props = {};
type State = {};

export default class Login extends Component<Props, State> {


    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        fetch('http://localhost:5000/jira', {
            method: 'POST',
            body: data,
        }).then(r => r.json()
        ).then(r => console.log(r));
    };

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email">
                        <label>Username</label>
                        <FormControl
                            id="username" name="username"
                            autoFocus
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup controlId="password">
                        <label>Password</label>
                        <FormControl
                            id="password" name="password"
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