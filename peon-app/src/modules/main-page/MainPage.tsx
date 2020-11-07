import React, {Component, ReactText} from 'react';
import {ProjectModel} from "./models/ProjectModel";
import ProjectCard from "./ProjectCard";
import {MDBCard, MDBCol, MDBContainer, MDBInput, MDBNavbar, MDBRow} from "mdbreact";
import {randomBytes} from "crypto";

type Props = {};
type State = { projects: ProjectModel[], textArea: string };

export default class MainPage extends Component<Props, State> {

    state: State = {
        projects: [],
        textArea: ""
    }

    componentDidMount() {
        let projects_string = localStorage.getItem("__peon__projects");
        let projects: ProjectModel[] = projects_string ? JSON.parse(projects_string) : [];
        if (projects !== null)
            this.setState({projects})
    }

    logout = () => {
        this.setState({projects: []})
        localStorage.removeItem("__peon__projects")
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const that = this;
        fetch('https://peon.dev.esolutions.ro:5000/jira', {
            method: 'POST',
            body: data,
        }).then(r => r.json())
            .then(r => that.setState({projects: Object.keys(r).map(value => r[value])}, () => {
                    localStorage.setItem("__peon__projects", JSON.stringify(this.state.projects))
                }
            ));

    };

    changeTextAreaValueOnClick = (value: ReactText) => {
        let new_value = this.state.textArea + value.toString() + "\n";
        this.setState({textArea: new_value})
    }

    changeTextAreaValueOnWrite = (value: ReactText) => {
        this.setState({textArea: value.toString()})
    }

    render() {
        if (!this.state.projects || this.state.projects.length === 0) {
            return (
                <>
                    <MDBNavbar color="indigo" className="d-flex justify-content-between" expand="md">
                        <img src="logo_forge_transparent.png" style={{width: "50px", height: "50px"}}/>
                        <span className="text-white pr-5">Let the Peon do the work !</span>
                    </MDBNavbar>
                    <MDBContainer className="d-flex justify-content-center pt-5">
                        <p className="text-break" style={{whiteSpace: "pre-line", textAlign: "center"}}>
                            Tired of writing activio descriptions by hand? Then you are in the right place! Let the
                            Peon do the work for you right now and right here! {"\n"}
                            DISCLAIMER: We do not save passwords! {"\n"}
                            NU SALVAM PAROLE!!!!!!!
                        </p>
                    </MDBContainer>
                    <MDBContainer className="d-flex justify-content-center pt-5">
                        <MDBCard style={{width: "400px"}} className="text-center">
                            <form className="px-4 pb-4" onSubmit={this.handleSubmit}>

                                <MDBInput label="Username" name="username" id="username"/>

                                <MDBInput type="password" label="Password" name="password" id="password"/>

                                <button className="btn btn-indigo " type="submit">Get Projects</button>
                            </form>
                        </MDBCard>
                    </MDBContainer>
                </>
            );
        }

        return (
            <>
                <MDBNavbar color="indigo" className="d-flex justify-content-between" expand="md">
                    <img src="logo_forge_transparent.png" style={{width: "50px", height: "50px"}}/>
                    <span className="text-white">Let the Peon do the work !</span>
                    <button className="btn btn-primary" onClick={this.logout}>Logout</button>
                </MDBNavbar>
                <MDBContainer fluid className="pt-3">

                    <MDBContainer fluid>
                        <MDBInput type="textarea"
                                  id="_peon_text_to_copy"
                                  value={this.state.textArea}
                                  getValue={this.changeTextAreaValueOnWrite}
                                  rows="7"
                                  style={{resize: "none", overflowY: "scroll"}}
                                  label="Your Clipboard"
                        />
                    </MDBContainer>

                    <MDBRow size="12">
                        <MDBCol className="clearfix" size="4">
                            {this.state.projects.map((task: ProjectModel, index) => {
                                if (index % 3 === 0) return (
                                    <ProjectCard textAreaChange={this.changeTextAreaValueOnClick.bind(this)}
                                                 key={task.name + index + randomBytes(9).toString()}
                                                 issues={task.issues}
                                                 name={task.name}/>
                                )
                                return ""
                            })}
                        </MDBCol>
                        <MDBCol className="clearfix" size="4">
                            {this.state.projects.map((task: ProjectModel, index) => {
                                if (index % 3 === 1) return (
                                    <ProjectCard textAreaChange={this.changeTextAreaValueOnClick.bind(this)}
                                                 key={task.name + index + randomBytes(9).toString()}
                                                 issues={task.issues}
                                                 name={task.name}/>
                                )
                                return ""
                            })}
                        </MDBCol>
                        <MDBCol className="clearfix" size="4">
                            {this.state.projects.map((task: ProjectModel, index) => {
                                if (index % 3 === 2) return (
                                    <ProjectCard textAreaChange={this.changeTextAreaValueOnClick.bind(this)}
                                                 key={task.name + index + randomBytes(9).toString()}
                                                 issues={task.issues}
                                                 name={task.name}/>
                                )
                                return ""
                            })}
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </>
        );
    };
}
