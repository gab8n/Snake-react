import styles from '../FormStyle.module.scss';
import 'nes.css/css/nes.min.css';
import React, { useState } from 'react';
import googleLogo from '../../Assets/googleLogo2.png';

import { useDispatch } from 'react-redux';
import { toggleRegister } from '../../Redux/Ducks/loginOrRegister';
import CustomButton from '../../Common/CustomButton/CustomButton';
import {
  writeOnEmailFocusMessage,
  writeOnPasswordFocusMessage,
} from '../../Redux/Ducks/avatarMessage';

import { useSelector } from 'react-redux';
import {
  signInWithGoogle,
  signInWithEmailAndPassword,
} from '../../Services/firebase';

const LogInForm = () => {
  const dispatch = useDispatch();
  const {
    loginForm,
    logInButtons,
    googleLogoStyle,
    logInButtonsContainer,
    googleLogInButton,
    submitLogInButton,
    logInInput,
    registerButton,
  } = styles;

  const [logInCredentials, setlogInCredentials] = useState({
    email: '',
    password: '',
  });

  const handleEmailAndPasswordLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      logInCredentials.email,
      logInCredentials.password
    );
  };
  return (
    <form
      className={loginForm}
      onSubmit={handleEmailAndPasswordLogin}
      autocomplete="off"
    >
      <div className="nes-field">
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={logInCredentials.email}
          onChange={(e) =>
            setlogInCredentials((prevState) => ({
              ...prevState,
              email: e.target.value,
            }))
          }
          className={`nes-input ${logInInput}`}
          onFocus={() => dispatch(writeOnEmailFocusMessage())}
        />
      </div>
      <div className="nes-field">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={logInCredentials.password}
          onChange={(e) =>
            setlogInCredentials((prevState) => ({
              ...prevState,
              password: e.target.value,
            }))
          }
          className={`nes-input ${logInInput}`}
          onFocus={() => dispatch(writeOnPasswordFocusMessage())}
        />
      </div>

      <div className={logInButtonsContainer}>
        <CustomButton
          label={'LogIn'}
          additionalStyle={`${logInButtons} ${submitLogInButton}`}
          type="submit"
        />
        <CustomButton
          additionalStyle={`${logInButtons} ${googleLogInButton}`}
          onClick={signInWithGoogle}
        >
          <img src={googleLogo} className={googleLogoStyle} />
        </CustomButton>
      </div>
      <CustomButton
        label={'Register'}
        additionalStyle={`${logInButtons} ${registerButton}`}
        onClick={() => dispatch(toggleRegister())}
      />
    </form>
  );
};

export default LogInForm;
