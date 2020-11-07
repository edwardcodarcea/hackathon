
import React, {Component, ReactText} from 'react';
import Login from "../login/Login";
import {ProjectModel} from "./models/ProjectModel";
import ProjectCard from "./ProjectCard";
import {MDBCard, MDBCol, MDBContainer, MDBInput} from "mdbreact";
import {randomBytes} from "crypto";

type Props = {};
type State = {projects: ProjectModel[]};

export default class MainPage extends Component<Props, State> {

	state : State = {projects: []}

	login = (projects: any) => {
		let arr_pr:ProjectModel[] = Object.keys(projects).map(value => { return projects[value]})
		this.setState({projects: arr_pr})
		console.log(projects)
	}

	handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const that = this;
		fetch('http://localhost:5000/jira', {
			method: 'POST',
			body: data,
		}).then(r => r.json())
			.then(r => that.setState({projects:Object.keys(r).map(value => r[value])}));

	};

	render() {
		if (this.state.projects.length === 0){
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
			);
		}

		return (
	      <MDBContainer fluid>
			  {this.state.projects.map((task:ProjectModel, index)  => {
			  	return(
			  		<MDBCol md="12" lg="12" sm="12" key={index + randomBytes(9).toString()}>
						<ProjectCard key={task.name + index + randomBytes(9).toString()} issues={task.issues} name={task.name}/>
					</MDBCol>
					)
			  })}
		  </MDBContainer>
		);
	};
}
