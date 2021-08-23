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
import backgroundMusicLogin from '../Sounds/backgroundMusicLogin.mp3';
import AccountHistory from './AccountHistory/AccountHistory';

const LogIn = () => {
  const dispatch = useDispatch();
  dispatch(writeLoginPageMessage());

  const {
    logInContainer,
    mooshroomGirlGifStyle,
    sakuraTreeGifStyle,
    mooshroomGirlMessageStyle,
  } = styles;
  const loginOrRegisterState = useSelector((state) => state.loginOrRegister);
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  const playMusicVolume = useSelector(
    (state) => state.volumeManager.musicVolume
  );

  const [playbackgroundMusic, { stop }] = useSound(backgroundMusicLogin, {
    loop: true,
    volume: playMusicVolume / 10,
    interrupt: true,
  });

  useEffect(() => {
    playbackgroundMusic();
    return () => stop();
  }, [playbackgroundMusic]);
  console.log(loggedIn);
  return (
    <div className={logInContainer}>
      {!loggedIn ? (
        <>
          {loginOrRegisterState === 'REGISTER' ? (
            <RegisterForm />
          ) : (
            <LogInForm />
          )}
        </>
      ) : (
        <AccountHistory />
      )}

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
