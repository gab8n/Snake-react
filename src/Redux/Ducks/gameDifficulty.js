const EASY = 'snakeReact/gameDifficulty/easy';
const MEDIUM = 'snakeReact/gameDifficulty/medium';
const HARD = 'snakeReact/gameDifficulty/hard';
const STOP = 'snakeReact/gameDifficulty/stop';

const initialState = 150;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EASY:
      return 175;
    case MEDIUM:
      return 150;
    case HARD:
      return 125;
    case STOP:
      return null;
    default:
      return state;
  }
}

export const playEasyDifficulty = () => {
  return { type: EASY };
};
export const playMediumDifficulty = () => {
  return { type: MEDIUM };
};
export const playHardDifficulty = () => {
  return { type: HARD };
};
export const stopGame = () => {
  return { type: STOP };
};
