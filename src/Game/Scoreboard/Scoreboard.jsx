import styles from '../Scoreboard/Scoreboard.module.scss';
import { getUsersScore } from '../../Services/firebase';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Scoreboard = () => {
  const {
    scoreboardContainer,
    scoreboardTitle,
    scoreStyle,
    currentUserScoreStyle,
  } = styles;
  const [scoreboardArray, setScoreboardArray] = useState();
  const difficulty = useSelector((state) => {
    return state.gameDifficulty === 125
      ? 'hard'
      : state.gameDifficulty === 150
      ? 'medium'
      : 'easy';
  });
  const currentUser = useSelector((state) => state.auth);
  const getData = async () => {
    const result = await getUsersScore(difficulty);
    setScoreboardArray(result);
  };
  useEffect(() => {
    getData();
  }, [difficulty, currentUser]);

  return (
    <>
      <div className={scoreboardTitle}>
        <h2>ScoreBoard</h2>
      </div>
      <div className={scoreboardContainer}>
        {scoreboardArray &&
          scoreboardArray.map((element, index) => {
            return (
              <div
                className={
                  currentUser.userData.userId === element.userId &&
                  currentUser.loggedIn
                    ? `${scoreStyle} ${currentUserScoreStyle}`
                    : scoreStyle
                }
                key={index}
              >
                {index}.{element.username}: {element.score}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Scoreboard;
