import React, {Component, ReactText} from 'react';
import {ProjectModel} from "./models/ProjectModel";
import ProjectCard from "./ProjectCard";
import {MDBCard, MDBCol, MDBContainer, MDBInput, MDBNavbar, MDBRow} from "mdbreact";
import {randomBytes} from "crypto";

type Props = {};
type State = { projects: ProjectModel[], textArea:string };

export default class MainPage extends Component<Props, State> {

    state: State = {projects: [],
        textArea:""
    }

    componentDidMount() {
        let projects_string = localStorage.getItem("__peon__projects");
        console.log(projects_string)
        let projects: ProjectModel[] = projects_string? JSON.parse(projects_string) : [];
        if (projects !== null)
            this.setState({projects})
    }



    logout = () =>{
        this.setState({projects:[]})
        localStorage.removeItem("__peon__projects")
    }

    login = (projects: any) => {
        let arr_pr: ProjectModel[] = Object.keys(projects).map(value => {
            return projects[value]
        })
        localStorage.setItem("__peon__projects", arr_pr.toString())
        this.setState({projects: arr_pr})
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const that = this;
        fetch('http://localhost:5000/jira', {
            method: 'POST',
            body: data,
        }).then(r => r.json())
            .then(r => that.setState({projects: Object.keys(r).map(value => r[value])},() =>{
                localStorage.setItem("__peon__projects", JSON.stringify(this.state.projects))}
            ));

    };
    chageTextAreaValue = (value : ReactText) =>{
            if (value.toString() !== this.state.textArea)
                this.setState({textArea:value.toString()})
    }
    render() {
        if (!this.state.projects || this.state.projects.length === 0) {
            return (
                <>
                    <MDBNavbar color="indigo" className="d-flex justify-content-between" expand="md">
                        <img src="logo_forge_transparent.png" style={{width:"50px", height:"50px"}}/>
                        <span className="text-white pr-5">Let the Peon do the work !</span>
                        <span></span>
                    </MDBNavbar>
                    <MDBContainer className="d-flex justify-content-center pt-5">
                        <p className="text-break">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing software like Aldus PageMaker including
                            versions of Lorem Ipsum.
                        </p>
                    </MDBContainer>
                    <MDBContainer className="d-flex justify-content-center pt-5">
                        <MDBCard style={{width: "400px"}} className="text-center">
                            <form className="p-2 " onSubmit={this.handleSubmit.bind(this)}>

                                <MDBInput label="Username" name="username" id="username"/>

                                <MDBInput type="password" label="Password" name="password" id="password"/>

                                <button className="btn btn-indigo " type="submit">Get Projects</button>
                            </form>
                        </MDBCard>
                    </MDBContainer>
                </>
            );}
        return (
            <>
                <MDBNavbar color="indigo" className="d-flex justify-content-between" expand="md">
                    <img src="logo_forge_transparent.png" style={{width:"50px", height:"50px"}}/>
                    <span className="text-white">Let the Peon do the work !</span>
                    <button className="btn btn-primary" onClick={this.logout.bind(this)}>Logout</button>
                </MDBNavbar>
                <MDBContainer fluid className="pt-5">




                    <MDBContainer fluid size="12">
                    <MDBInput type="textarea" id="_peon_text_to_copy" value={this.state.textArea} getValue={this.chageTextAreaValue}/>
                    </MDBContainer>




                    <MDBRow size="12">
                        <MDBCol className="clearfix" size="4" >
                            {this.state.projects.map((task: ProjectModel, index) => {
                                if (index % 3 === 0) return (

                                    <ProjectCard textAreaChange={this.chageTextAreaValue.bind(this)} key={task.name + index + randomBytes(9).toString()} issues={task.issues}
                                                 name={task.name}/>
                                )
                                return ""
                            })}
                        </MDBCol>
                        <MDBCol className="clearfix" size="4">
                            {this.state.projects.map((task: ProjectModel, index) => {
                                if (index % 3 === 1) return (


                                    <ProjectCard textAreaChange={this.chageTextAreaValue.bind(this)} key={task.name + index + randomBytes(9).toString()} issues={task.issues}
                                                 name={task.name}/>
                                )
                                return ""
                            })}
                        </MDBCol>
                        <MDBCol className="clearfix" size="4" >
                            {this.state.projects.map((task: ProjectModel, index) => {
                                if (index % 3 === 2) return (

                                    <ProjectCard textAreaChange={this.chageTextAreaValue.bind(this)} key={task.name + index + randomBytes(9).toString()} issues={task.issues}
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
