import './App.css';
import Game from '../src/Game/Game';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Menu from './UI/Menu';
import LogIn from './LogIn/LogIn';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import useSound from 'use-sound';

function App() {
  const backgroundMusic = useSelector((state) => state.backgroundMusic);
  const playMusicVolume = useSelector(
    (state) => state.volumeManager.musicVolume
  );

  const [playbackgroundMusic, { stop }] = useSound(backgroundMusic, {
    loop: true,
    volume: playMusicVolume / 10,
    interrupt: true,
  });

  useEffect(() => {
    playbackgroundMusic();
    return () => stop();
  }, [playbackgroundMusic]);

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
