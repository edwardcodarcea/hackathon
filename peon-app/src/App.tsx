import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './modules/login/Login';
import {MDBNavbar} from "mdbreact";
import MainPage from "./modules/main-page/MainPage";

const App = () => {
  return (
  		<>
			<MDBNavbar color="indigo" className="d-flex justify-content-between" expand="md">
					<img src="logo_forge_transparent.png" style={{width:"50px", height:"50px"}}/>
					<span className="text-white pr-5">Let the Peon do the work !</span>
					<span/>
			</MDBNavbar>
			<BrowserRouter>
				<Switch>
					<Route exact path="/">
						<MainPage key = "1"/>
					</Route>
				</Switch>
			</BrowserRouter>
		</>
  );
}

export default App;
