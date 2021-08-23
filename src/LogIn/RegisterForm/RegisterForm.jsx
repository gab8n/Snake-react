import styles from '../FormStyle.module.scss';
import 'nes.css/css/nes.min.css';
import React, { useState } from 'react';
import googleLogo from '../../Assets/googleLogo2.png';

import { useDispatch, useSelector } from 'react-redux';
import { toggleLogin } from '../../Redux/Ducks/loginOrRegister';
import CustomButton from '../../Common/CustomButton/CustomButton';
import {
  writeOnEmailFocusMessage,
  writeOnPasswordFocusMessage,
  writeOnUsernameFocusMessage,
} from '../../Redux/Ducks/avatarMessage';
import { setUserData } from '../../Redux/Ducks/auth';

import {
  signInWithGoogle,
  createUserWithEmailAndPassword,
} from '../../Services/firebase';
const RegisterForm = () => {
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
    inputUpperText,
  } = styles;

  const [registerCredentials, setRegisterCredentials] = useState({
    email: '',
    password: '',
    username: '',
  });
  const currentUser = useSelector((state) => state.auth);
  const handleCreateUserWithEmailAndPassword = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      registerCredentials.email,
      registerCredentials.password,
      registerCredentials.username,
      (data) => dispatch(setUserData(data))
    );
  };

  return (
    <form
      className={loginForm}
      onSubmit={handleCreateUserWithEmailAndPassword}
      autocomplete="off"
    >
      <div className="nes-field">
        <label className={inputUpperText}>Username</label>
        <input
          type="text"
          name="username"
          value={registerCredentials.username}
          onChange={(e) =>
            setRegisterCredentials((prevState) => ({
              ...prevState,
              username: e.target.value,
            }))
          }
          className={`nes-input ${logInInput}`}
          onFocus={() => dispatch(writeOnUsernameFocusMessage())}
        />
      </div>
      <div className="nes-field">
        <label className={inputUpperText}>Email</label>
        <input
          type="text"
          name="email"
          value={registerCredentials.email}
          onChange={(e) =>
            setRegisterCredentials((prevState) => ({
              ...prevState,
              email: e.target.value,
            }))
          }
          className={`nes-input ${logInInput}`}
          onFocus={() => dispatch(writeOnEmailFocusMessage())}
        />
      </div>
      <div className="nes-field">
        <label className={inputUpperText}>Password</label>
        <input
          type="password"
          name="password"
          value={registerCredentials.password}
          onChange={(e) =>
            setRegisterCredentials((prevState) => ({
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
          label={'Register'}
          additionalStyle={`${logInButtons} ${submitLogInButton}`}
          type="submit"
        />
        <CustomButton
          additionalStyle={`${logInButtons} ${googleLogInButton}`}
          onClick={() =>
            signInWithGoogle((data) => dispatch(setUserData(data)))
          }
        >
          <img src={googleLogo} className={googleLogoStyle} />
        </CustomButton>
      </div>
      <CustomButton
        label={'SignIn'}
        additionalStyle={`${logInButtons} ${registerButton}`}
        onClick={() => dispatch(toggleLogin())}
      />
    </form>
  );
};

export default RegisterForm;
