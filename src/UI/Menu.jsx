import logo from '../Assets/Logo.png';
import styles from '../UI/Menu.module.scss';
import warriorGif from '../Assets/fantasy-warrior.gif';
import 'nes.css/css/nes.min.css';
import { useEffect } from 'react';
import useSound from 'use-sound';

import { Link } from 'react-router-dom';
import React from 'react';
import SettingsWindow from '../Common/SettingsWindow/SettingsWindow';
import { useDispatch, useSelector } from 'react-redux';
import { writeMenuPageMessage } from '../Redux/Ducks/avatarMessage';
import AvatarWithMessage from '../Common/AvatarWithMessage/AvatarWithMessage';
import backgroundMusicMenu from '../Sounds/backgroundMusicMenu.mp3';

const Menu = () => {
  const dispatch = useDispatch();
  dispatch(writeMenuPageMessage());

  const {
    menuContainer,
    logoImage,
    logoContainer,
    logoText,
    warriorGifStyle,
    pixelBoder,
    warriorMessageStyle,
  } = styles;

  const playMusicVolume = useSelector(
    (state) => state.volumeManager.musicVolume
  );

  const [playbackgroundMusic, { stop }] = useSound(backgroundMusicMenu, {
    loop: true,
    volume: playMusicVolume / 10,
    interrupt: true,
  });

  useEffect(() => {
    playbackgroundMusic();
    return () => stop();
  }, [playbackgroundMusic]);

  return (
    <div className={menuContainer}>
      <div className={logoContainer}>
        <img src={logo} alt="Logo" className={logoImage} />
        <h2 className={logoText}>Serpent</h2>
      </div>
      <Link to="/game">
        <div className={pixelBoder}>Start</div>
      </Link>
      <Link to="/logIn">
        <div className={pixelBoder}>LogIn</div>
      </Link>
      <AvatarWithMessage
        avatarImageStyle={warriorGifStyle}
        avatarImage={warriorGif}
        avatarMessageClass={warriorMessageStyle}
        avatarMessagedirection="right"
      />
      <SettingsWindow />
    </div>
  );
};

export default Menu;
