import { useState, useEffect } from 'react';
import useSound from 'use-sound';

import styles from '../Countdown/Countdown.module.scss';
import oneSound from '../../Sounds/1.ogg';
import twoSound from '../../Sounds/2.ogg';
import threeSound from '../../Sounds/3.ogg';
import goSound from '../../Sounds/go.ogg';

const countdownActions = [
  { text: 'GO', sound: goSound },
  { text: '1', sound: oneSound },
  { text: '2', sound: twoSound },
  { text: '3', sound: threeSound },
];

const Countdown = ({ onCountdownEnd }) => {
  const { countdownStyle } = styles;
  const [countdownNumber, setCountdownNumber] = useState(3);

  const [playCountdownSound] = useSound(
    countdownActions[countdownNumber].sound,
    {
      interrupt: true,
    }
  );

  useEffect(() => {
    const makeCowntdown = (countdownNumber) => {
      if (countdownNumber >= 0) {
        setTimeout(() => makeCowntdown(countdownNumber - 1), 1000);
        setCountdownNumber(countdownNumber);
      } else onCountdownEnd && onCountdownEnd();
    };
    makeCowntdown(countdownNumber);
  }, []);

  useEffect(() => {
    playCountdownSound();
  }, [playCountdownSound]);
  return (
    <div className={countdownStyle}>
      {countdownActions[countdownNumber].text}
    </div>
  );
};

export default Countdown;
