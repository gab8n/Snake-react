import styles from '../LogIn/LogIn.module.scss';
import 'nes.css/css/nes.min.css';
import mooshroomGirlGif from '../Assets/mooshroomGirl.gif';
import sakuraTreeGif from '../Assets/WeirdValidJoey.webp';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import LogInForm from './LogInForm/LogInForm';
import RegisterForm from './RegisterForm/RegisterForm';
import SettingsWindow from '../Common/SettingsWindow/SettingsWindow';
import AvatarWithMessage from '../Common/AvatarWithMessage/AvatarWithMessage';
import useSound from 'use-sound';
import { writeLoginPageMessage } from '../Redux/Ducks/avatarMessage';
// import fantasyGameBackground from '../Sounds/Fantasy_Game_Background.mp3';
import { playBackgroundMusicLogin } from '../Redux/Ducks/backgroundMusic';

const LogIn = () => {
  const dispatch = useDispatch();
  dispatch(writeLoginPageMessage());
  dispatch(playBackgroundMusicLogin());

  const {
    logInContainer,
    mooshroomGirlGifStyle,
    sakuraTreeGifStyle,
    mooshroomGirlMessageStyle,
  } = styles;
  const loginOrRegisterState = useSelector((state) => state.loginOrRegister);

  // const [playbackgroundMusic] = useSound(fantasyGameBackground, {
  //   loop: true,
  //   // volume: playMusicVolume / 10,
  //   interrupt: true,
  // });

  // useEffect(() => {
  //   playbackgroundMusic();
  // }, [playbackgroundMusic]);

  return (
    <div className={logInContainer}>
      {loginOrRegisterState === 'REGISTER' ? <RegisterForm /> : <LogInForm />}

      <img
        src={sakuraTreeGif}
        className={sakuraTreeGifStyle}
        alt="sakuraTree"
      />

      <AvatarWithMessage
        avatarImageStyle={mooshroomGirlGifStyle}
        avatarImage={mooshroomGirlGif}
        avatarMessageClass={mooshroomGirlMessageStyle}
        avatarMessagedirection="left"
      />
      <SettingsWindow />
    </div>
  );
};

export default LogIn;
