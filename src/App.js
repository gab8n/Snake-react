import './App.css';
import SnakeBoard from './Board/SnakeBoard';
import useSound from 'use-sound';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import backgroundMusic from '../src/Sounds/backgroundMusic.mp3';
import Menu from './UI/Menu';
import LogIn from './LogIn/LogIn';

function App() {
  const [playbackgroundMusic] = useSound(backgroundMusic, { loop: true });
  // playbackgroundMusic();
  return (
    <Router>
      <div className="App"></div>
      <Switch>
        <Route path="/logIn" component={LogIn}></Route>
        <Route path="/game" component={SnakeBoard}></Route>
        <Route path="/" component={Menu}></Route>
      </Switch>
    </Router>
  );
}

export default App;
