import styles from './HeartIconLives.module.scss';
import emptyHeart from '../../Assets/heartEmpty.png';
import fullHeart from '../../Assets/heartFull.png';
const HeartIconLives = ({ lives }) => {
  const { heartIconContainer, heartLiveStyle } = styles;
  return (
    <div className={heartIconContainer}>
      <img
        src={lives < 1 ? emptyHeart : fullHeart}
        className={heartLiveStyle}
      />
      <img
        src={lives < 2 ? emptyHeart : fullHeart}
        className={heartLiveStyle}
      />
      <img
        src={lives < 3 ? emptyHeart : fullHeart}
        className={heartLiveStyle}
      />
    </div>
  );
};

export default HeartIconLives;
