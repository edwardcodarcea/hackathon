import React, {Component} from 'react';

import {MDBContainer, MDBInput,MDBCard} from "mdbreact";

type Props = {afterLogin : any};
type State = {};

export default class Login extends Component<Props, State> {

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const that = this;
        fetch('http://localhost:5000/jira', {
            method: 'POST',
            body: data,
        }).then(r => r.json()).then(r => that.afterLogin(r));

    };

    afterLogin = (response : any) => {
        this.props.afterLogin(response)
    }

    render() {
        return (
            <>
                <MDBContainer className="d-flex justify-content-center pt-5">
                    <p className="text-break">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </MDBContainer>
                <MDBContainer className="d-flex justify-content-center pt-5">
                    <MDBCard style={{width:"400px"}} className="text-center">
                        <form className="p-2 " onSubmit={this.handleSubmit.bind(this)}>

                            <MDBInput  label="Email" name="username" id="username"/>

                            <MDBInput type="password"  label="Password"  name="password" id="password"/>

                            <button className="btn btn-indigo " type="submit">Login</button>
                        </form>
                    </MDBCard>
                </MDBContainer>
            </>
        )
    };
}
