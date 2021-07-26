import SnakeBoard from '../Board/SnakeBoard';
import swordGuyGif from '../Assets/bat.gif';
import Typical from 'react-typical';
import styles from '../Game/Game.module.scss';
import useSound from 'use-sound';
// import backgroundMusic from '../Sounds/backgroundMusic.mp3';
import SettingsWindow from '../Common/SettingsWindow/SettingsWindow';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { playBackgroundMusicGame } from '../Redux/Ducks/backgroundMusic';
import Countdown from './Countdown/Countdown';

const Game = () => {
  const playMusicVolume = useSelector(
    (state) => state.volumeManager.musicVolume
  );

  const dispatch = useDispatch();
  dispatch(playBackgroundMusicGame());

  const { swordGuyGifStyle, swordGuyMessageStyle, gameContainer } = styles;
  return (
    <div className={gameContainer}>
      <SnakeBoard />
      <img src={swordGuyGif} className={swordGuyGifStyle} alt="swordGuy" />
      <div className={swordGuyMessageStyle}>
        <p class="nes-balloon from-left ">
          <Typical
            steps={['Win the game', 5000]}
            // loop={Infinity}
            wrapper="p"
          />
        </p>
      </div>
      <SettingsWindow />
    </div>
  );
};

export default Game;
