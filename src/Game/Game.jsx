import SnakeBoard from '../Board/SnakeBoard';
import swordGuyGif from '../Assets/bat.gif';
import Typical from 'react-typical';
import styles from '../Game/Game.module.scss';
import AvatarWithMessage from '../Common/AvatarWithMessage/AvatarWithMessage';
import useSound from 'use-sound';
import SettingsWindow from '../Common/SettingsWindow/SettingsWindow';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import backgroundMusicGame from '../Sounds/backgroundMusicGame.mp3';

const Game = () => {
  const playMusicVolume = useSelector(
    (state) => state.volumeManager.musicVolume
  );

  const [playbackgroundMusic, { stop }] = useSound(backgroundMusicGame, {
    loop: true,
    volume: playMusicVolume / 10,
    interrupt: true,
  });

  useEffect(() => {
    playbackgroundMusic();
    return () => stop();
  }, [playbackgroundMusic]);

  const { swordGuyGifStyle, swordGuyMessageStyle, gameContainer } = styles;
  return (
    <div className={gameContainer}>
      <SnakeBoard />
      <AvatarWithMessage
        avatarImageStyle={swordGuyGifStyle}
        avatarImage={swordGuyGif}
        avatarMessageClass={swordGuyMessageStyle}
        avatarMessagedirection="left"
      />
      <SettingsWindow />
    </div>
  );
};

export default Game;
