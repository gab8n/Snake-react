import gameOverGif from '../../Assets/GameOver.gif';
import styles from './GameOverAnimation.module.scss';
import { useEffect } from 'react';

const GameOverAnimation = ({ onFinishAnimation }) => {
  const { gameOverAnimationStyle } = styles;

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinishAnimation();
    }, 2100);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className={gameOverAnimationStyle}>
      <img src={gameOverGif} />
    </div>
  );
};

export default GameOverAnimation;
