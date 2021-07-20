import styles from '../LogIn/LogIn.module.scss';
import 'nes.css/css/nes.min.css';
import mooshroomGirlGif from '../Assets/mooshroomGirl.gif';
import sakuraTreeGif from '../Assets/WeirdValidJoey.webp';

import { useSelector } from 'react-redux';

import LogInForm from './LogInForm/LogInForm';
import RegisterForm from './RegisterForm/RegisterForm';
import SettingsWindow from '../Common/SettingsWindow/SettingsWindow';
import AvatarWithMessage from '../Common/AvatarWithMessage/AvatarWithMessage';
import { useDispatch } from 'react-redux';
import { writeLoginPageMessage } from '../Redux/Ducks/avatarMessage';

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
