import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import SettingIcon from '../SettingIcon/SettingIcon';
import styles from './SettingWindow.module.scss';
import VolumeSlider from './VolumeSlider/VolumeSlider';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeEffectsVolume,
  changeMusicVolume,
} from '../../Redux/Ducks/volumeManager';
import {
  playEasyDifficulty,
  playMediumDifficulty,
  playHardDifficulty,
} from '../../Redux/Ducks/gameDifficulty';

import { signOut, updateUserHistory } from '../../Services/firebase';
import { logout } from '../../Redux/Ducks/auth';
import { toggleOpen, toggleClose } from '../../Redux/Ducks/settingWindow';

import exitIcon from '../../Assets/exit.png';
import fullScreenIcon from '../../Assets/fullscreen.gif';
import windowedIcon from '../../Assets/windowed.gif';

import rightIcon from '../../Assets/right.gif';
import leftIcon from '../../Assets/left.gif';
import UsernameChangeSetting from './UsernameChangeSetting/UsernameChangeSetting';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40vw',
    height: '30vw',
  },
};
Modal.setAppElement('#root');
const SettingsWindow = () => {
  const dispatch = useDispatch();
  let effectsVolume = useSelector((state) => state.volumeManager.effectsVolume);
  let MusicVolume = useSelector((state) => state.volumeManager.musicVolume);
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const userData = useSelector((state) => state.auth.userData);
  const modalIsOpen = useSelector((state) => state.settingWindow);
  const difficultyIndex = useSelector((state) => {
    return state.gameDifficulty === 125
      ? 2
      : state.gameDifficulty === 150
      ? 1
      : 0;
  });

  const {
    modalContainer,
    modal,
    modalClose,
    settingStyle,
    settingTitle,
    fullScreenIconStyle,
    fullScreenStatusStyle,
    fullScreenSetting,
    changeDifficultyStyle,
    dificultyChangeIcon,
    difficultyStyle,
    logoutButton,
  } = styles;

  const [isFullScreen, setFullScreeen] = useState(!document.fullscreenElement);
  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.body.parentElement.requestFullscreen();
    }
    setFullScreeen(document.fullscreenElement);
  };
  const [difficulty, setDifficulty] = useState(difficultyIndex);
  const toggleDifficulty = (difficultyDirection) => {
    if (difficultyDirection === 'increment')
      if (difficulty > 1) {
        setDifficulty(0);
      } else setDifficulty(difficulty + 1);
    else if (difficultyDirection === 'decrement') {
      if (difficulty < 1) {
        setDifficulty(2);
      } else setDifficulty(difficulty - 1);
    }
  };
  const difficultyArray = ['Easy', 'Medium', 'Hard'];

  function openModal() {
    dispatch(toggleOpen());
  }

  function closeModal() {
    dispatch(toggleClose());
  }
  useEffect(() => {
    difficulty === 0
      ? dispatch(playEasyDifficulty())
      : difficulty === 1
      ? dispatch(playMediumDifficulty())
      : dispatch(playHardDifficulty());
  }, [difficulty]);

  const handleLogout = () => {
    const userHistoryAction = 'The user has logged out';
    updateUserHistory(userHistoryAction, userData.userId);
    signOut(dispatch(logout()));
  };

  return (
    <div>
      <SettingIcon onClick={openModal} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        className={modal}
        overlayClassName={modalContainer}
      >
        <h2 className={settingTitle}>Settings</h2>
        <img src={exitIcon} className={modalClose} onClick={closeModal} />
        <div className={settingStyle}>
          <p>Effects Volume:</p>
          <VolumeSlider
            onChange={(value) => dispatch(changeEffectsVolume(parseInt(value)))}
            volume={effectsVolume}
          />
        </div>
        <div className={settingStyle}>
          <p>Music Volume:</p>
          <VolumeSlider
            onChange={(value) => dispatch(changeMusicVolume(parseInt(value)))}
            volume={MusicVolume}
          />
        </div>
        <div className={settingStyle}>
          <p>FullScreen:</p>
          <div
            className={`${fullScreenSetting} nes-pointer`}
            onClick={() => toggleFullScreen()}
          >
            <img
              src={isFullScreen ? fullScreenIcon : windowedIcon}
              className={fullScreenIconStyle}
            />

            <div className={fullScreenStatusStyle}>
              {isFullScreen ? 'OFF' : 'ON'}
            </div>
          </div>
        </div>
        <div className={settingStyle}>
          <p>Difficulty:</p>
          <div className={changeDifficultyStyle}>
            <img
              src={leftIcon}
              className={`${dificultyChangeIcon} nes-pointer`}
              onClick={() => {
                toggleDifficulty('decrement');
              }}
            />
            <div className={difficultyStyle}>{difficultyArray[difficulty]}</div>
            <img
              src={rightIcon}
              className={`${dificultyChangeIcon} nes-pointer`}
              onClick={() => {
                toggleDifficulty('increment');
              }}
            />
          </div>
        </div>
        {loggedIn ? (
          <div className={settingStyle}>
            <UsernameChangeSetting {...{ userData }} />
          </div>
        ) : (
          ''
        )}

        {loggedIn ? (
          <div className={settingStyle}>
            <button className={logoutButton} onClick={() => handleLogout()}>
              LogOut
            </button>
          </div>
        ) : (
          ''
        )}
      </Modal>
    </div>
  );
};

export default SettingsWindow;
