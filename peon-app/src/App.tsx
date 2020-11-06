import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, useParams} from 'react-router-dom';
import Login from './modules/login/Login';

const App = () => {
  return (
        <BrowserRouter>
			<Switch>
				<Route exact path="/login">
					<Login/>
				</Route>
			</Switch>
		</BrowserRouter>
  );
}

export default App;
