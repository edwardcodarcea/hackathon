import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {MDBNavbar} from "mdbreact";
import MainPage from "./modules/main-page/MainPage";

const App = () => {
  return (
  		<>
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
