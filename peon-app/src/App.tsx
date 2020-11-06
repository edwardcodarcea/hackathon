import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './modules/login/Login';

const App = () => {
  return (
        <BrowserRouter>
			<Switch>
				<Route exact path="/">
					<Login/>
				</Route>
			</Switch>
		</BrowserRouter>
  );
}

export default App;
