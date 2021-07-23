import Modal from 'react-modal';
import { useState } from 'react';
import SettingIcon from '../SettingIcon/SettingIcon';
import RangeSlider from './RangeSlider/RangeSlider';
import styles from './SettingWindow.module.scss';
import VolumeSlider from './VolumeSlider/VolumeSlider';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeEffectsVolume,
  changeMusicVolume,
} from '../../Redux/Ducks/volumeManager';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    height: '500px',
  },
};
Modal.setAppElement('#root');
const SettingsWindow = () => {
  const dispatch = useDispatch();
  let effectsVolume = useSelector((state) => state.volumeManager.effectsVolume);
  let MusicVolume = useSelector((state) => state.volumeManager.musicVolume);
  const { modalContainer, modal, modalClose } = styles;

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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
        <p>Modal content</p>
        <button className={modalClose} onClick={closeModal}>
          Hide modal
        </button>
        <p>Effects Volume</p>
        <VolumeSlider
          onChange={(value) => dispatch(changeEffectsVolume(parseInt(value)))}
          volume={effectsVolume}
        />
        <p>Music Volume</p>
        <VolumeSlider
          onChange={(value) => dispatch(changeMusicVolume(parseInt(value)))}
          volume={MusicVolume}
        />
      </Modal>
    </div>
  );
};

export default SettingsWindow;
