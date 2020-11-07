
import React, {Component} from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCollapse, MDBContainer} from 'mdbreact';
import {IssueModel} from "./models/IssueModel";
import {randomBytes} from "crypto";
import "./ProjectCard.css";
type Props = {key: string, name:string, issues:IssueModel[]};
type State = {outCollapseID:string,inCollapseID:string};

export default class ProjectCard extends Component<Props, State> {
    state = {
        outCollapseID: "",
        inCollapseID: ""
    }

    intoggleCollapse = (inCollapseID: string) => () => {
        this.setState(prevState => ({
            inCollapseID: prevState.inCollapseID !== inCollapseID ? inCollapseID : ""
        }));
    }
    outtoggleCollapse = (outCollapseID: string) => () => {
        this.setState(prevState => ({
            outCollapseID: prevState.outCollapseID !== outCollapseID ? outCollapseID : ""
        }));
    }
    render() {
        return (
            <MDBContainer>
                <MDBCard>
                    <MDBCardHeader onClick={this.outtoggleCollapse(this.props.name)}>
                        {this.props.name}
                    </MDBCardHeader>
                    <MDBCardBody>
                        <MDBCollapse  id={this.props.name} isOpen={this.state.outCollapseID}>
                        {this.props.issues.map((value,index) => {
                            return(
                                <>
                                    <div className={"issue-title-"+index%2} onClick={this.intoggleCollapse(value.key)}>{value.key}</div>
                                    <MDBCollapse key={value.key + " " + value.status + " " + value.summary + index } id={value.key} isOpen={this.state.inCollapseID}>
                                        <p>
                                            {value.status + " " + value.summary}
                                        </p>
                                    </MDBCollapse>
                                </>
                            )
                        })}
                        </MDBCollapse>
                    </MDBCardBody>
                </MDBCard>

            </MDBContainer>
        );
    };
}
