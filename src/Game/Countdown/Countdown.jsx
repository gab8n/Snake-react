import { useState, useEffect } from 'react';
import styles from '../Countdown/Countdown.module.scss';

const Countdown = ({ onCountdownEnd }) => {
  const { countdownStyle } = styles;
  const [countdownNumber, setCountdownNumber] = useState(3);
  //   const makeCowntdown = (cowntdownNumber = 1) => {
  //     if (cowntdownNumber < 3) {
  //       setTimeout(() => makeCowntdown(cowntdownNumber + 1), 1000);
  //       console.log(cowntdownNumber);
  //     } else console.log('o terminat');
  //   };
  //   makeCowntdown();
  useEffect(() => {
    const makeCowntdown = (countdownNumber) => {
      if (countdownNumber >= 1) {
        setTimeout(() => makeCowntdown(countdownNumber - 1), 1000);
        console.log(countdownNumber);
        setCountdownNumber(countdownNumber);
      } else onCountdownEnd && onCountdownEnd();
    };
    makeCowntdown(countdownNumber);
  }, []);
  return <div className={countdownStyle}>{countdownNumber}</div>;
};

export default Countdown;
