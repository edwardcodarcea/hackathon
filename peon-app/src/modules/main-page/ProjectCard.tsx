import React, {Component, ReactText} from 'react';
import {MDBCard, MDBCardBody, MDBCardHeader, MDBCollapse, MDBContainer, MDBIcon, MDBPopper} from 'mdbreact';
import {IssueModel} from "./models/IssueModel";
import "./ProjectCard.css";
import CopyToClipboard from "react-copy-to-clipboard";

type Props = { textAreaChange: (value: ReactText) => any; key: string, name: string, issues: IssueModel[] };
type State = { outCollapseID: string };

export default class ProjectCard extends Component<Props, State> {
    state = {
        outCollapseID: ""
    }

    toggleCollapse = (outCollapseID: string) => () => {
        this.setState(prevState => ({
            outCollapseID: prevState.outCollapseID !== outCollapseID ? outCollapseID : ""
        }));
    }

    render() {
        return (
            <MDBContainer className="pt-3">
                <MDBCard>
                    <MDBCardHeader onClick={this.toggleCollapse(this.props.name)}>
                        {this.props.name}
                    </MDBCardHeader>
                    <MDBCardBody>
                        {this.props.issues.slice(0, 3).map((value, index) => {
                            return (
                                <>
                                    <div className={"d-flex justify-content-between issue-title-" + index % 2}>
                                        <div>
                                            {value.key + " : " + value.summary + " (" + value.status + ")"}
                                        </div>
                                        <div className={"d-flex justify-content-between"}>
                                            <div>
                                                <MDBIcon icon="plus"
                                                         onClick={() => this.props.textAreaChange(value.key + " : " + value.summary + " (" + value.status + ")")}/>
                                            </div>
                                            <MDBPopper tag={"span"} popover
                                                       domElement clickable placement="right">
                                            <span>
                                                <CopyToClipboard
                                                    text={value.key + " : " + value.summary + " (" + value.status + ")"}>
                                                   <MDBIcon far icon="copy"/>
                                                </CopyToClipboard>
                                            </span>
                                                <span>
                                                {"Text" +
                                                " copied : " + value.key + " : " + value.summary + " (" + value.status + ")"}
                                            </span>
                                            </MDBPopper>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                        <MDBCollapse id={this.props.name} isOpen={this.state.outCollapseID}>
                            {this.props.issues.slice(3).map((value, index) => {
                                return (
                                    <>
                                        <div
                                            className={"d-flex justify-content-between issue-title-" + (index + 1) % 2}>
                                            {value.key + " : " + value.summary + " (" + value.status + ")"}
                                            <MDBIcon far icon="copy"
                                                     onClick={() => this.props.textAreaChange(value.key + " : " + value.summary + " (" + value.status + ")")}/>

                                            <MDBPopper tag={"span"} popover
                                                       domElement clickable placement="right">
                                            <span>
                                                <CopyToClipboard
                                                    text={value.key + " : " + value.summary + " (" + value.status + ")"}>
                                                   <MDBIcon far icon="copy"/>
                                                </CopyToClipboard>
                                            </span>
                                                <span>
                                                {"Text" +
                                                " copied : " + value.key + " : " + value.summary + " (" + value.status + ")"}
                                            </span>
                                            </MDBPopper>
                                        </div>
                                    </>
                                )
                            })}
                        </MDBCollapse>

                        <MDBCollapse id={this.props.name} isOpen={!this.state.outCollapseID}>

                        </MDBCollapse>
                    </MDBCardBody>
                </MDBCard>

            </MDBContainer>
        );
    };
}
