import styles from './HeartIconLives.module.scss';

const HeartIconLives = ({ lives }) => {
  const { heartIconContainer } = styles;
  return (
    <div className={heartIconContainer}>
      <i
        className={
          'nes-icon is-large ' + (lives < 1 ? 'is-transparent heart' : 'heart')
        }
      ></i>
      <i
        className={
          'nes-icon is-large ' + (lives < 2 ? 'is-transparent heart' : 'heart')
        }
      ></i>
      <i
        className={
          'nes-icon is-large ' + (lives < 3 ? 'is-transparent heart' : 'heart')
        }
      ></i>
    </div>
  );
};

export default HeartIconLives;
