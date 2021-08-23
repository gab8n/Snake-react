import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './UsernameChangeSetting.module.scss';

import editIcon from '../../../Assets/edit.gif';

import { updateUsername } from '../../../Services/firebase';
import { setUserData } from '../../../Redux/Ducks/auth';
const UsernameChangeSetting = ({ userData }) => {
  const { changeUsernameStyle, usenameInput, editIconStyle, activeInputStyle } =
    styles;
  const [isActiveInput, setActiveInput] = useState(false);
  const [usernameValue, setUsernameValue] = useState(userData.username);
  const toggleActiveInput = () => {
    setActiveInput(!isActiveInput);
  };
  const dispatch = useDispatch();
  const handleEditIconClick = () => {
    toggleActiveInput();
  };
  const handleUpdateUsername = (newUsername) => {
    updateUsername(newUsername, userData.userId);
    dispatch(setUserData({ ...userData, username: newUsername }));
    toggleActiveInput();
  };
  return (
    <>
      <p>Username:</p>
      <div className={changeUsernameStyle}>
        <input
          type="text"
          className={
            isActiveInput ? `${usenameInput} ${activeInputStyle}` : usenameInput
          }
          defaultValue={userData.username}
          disabled={!isActiveInput}
          onChange={(e) => {
            setUsernameValue(e.target.value);
          }}
          onBlur={(e) => {
            handleUpdateUsername(e.target.value);
          }}
        />
        <img
          src={editIcon}
          className={`${editIconStyle} nes-pointer`}
          onClick={handleEditIconClick}
        />
      </div>
    </>
  );
};

export default UsernameChangeSetting;
