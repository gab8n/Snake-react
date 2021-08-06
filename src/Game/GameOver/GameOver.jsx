import Modal from 'react-modal';
import CustomButton from '../../Common/CustomButton/CustomButton';
import styles from './GameOver.module.scss';
import { Link } from 'react-router-dom';

import React, {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '28vw',
    height: '19vw',
  },
};
// Modal.setAppElement('body');
const GameOver = forwardRef(({ score, onReplay, restartGame }, ref) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  useImperativeHandle(ref, () => ({
    openModal() {
      setIsOpen(true);
    },
  }));

  function closeModal() {
    setIsOpen(false);
  }
  const {
    gameOverButton,
    modal,
    modalContainer,
    scoreStyle,
    numberScoreStyle,
  } = styles;

  return (
    <Modal
      isOpen={modalIsOpen}
      style={customStyles}
      className={modal}
      overlayClassName={modalContainer}
    >
      <div className={scoreStyle}>
        Score:<span className={numberScoreStyle}>{score}</span>
      </div>
      <CustomButton
        label={'Replay'}
        additionalStyle={`${gameOverButton}`}
        onClick={() => {
          onReplay();
          closeModal();
        }}
      />
      <Link to="/">
        <CustomButton
          label={'Menu'}
          additionalStyle={`${gameOverButton}`}
          onClick={restartGame}
        />
      </Link>
    </Modal>
  );
});

export default GameOver;
