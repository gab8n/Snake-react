import './App.css';
import Game from '../src/Game/Game';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Menu from './UI/Menu';
import LogIn from './LogIn/LogIn';

function App() {
  return (
    <Router>
      <div className="App"></div>
      <Switch>
        <Route path="/logIn" component={LogIn}></Route>
        <Route path="/game" component={Game}></Route>
        <Route path="/" component={Menu}></Route>
      </Switch>
    </Router>
  );
}

export default App;
